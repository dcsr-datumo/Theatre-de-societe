import { Injectable } from '@angular/core';
import {
  KnoraApiConfig,
  KnoraApiConnection,
  ApiResponseError,
  ReadResourceSequence,
  ReadResource,
} from '@dasch-swiss/dsp-js';
import { Observable, config, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CacheCalendarYear } from '../models/cache-calendar-year.model';
import { RepresentationMatch } from '../models/representationmatch.model';
import { Representation } from '../models/representation.model';
import { Place } from '../models/place.model';
import { Work } from '../models/work.model';
import { Genre } from '../models/genre.model';
import { Quote } from '../models/quote.model';
import { Festival } from '../models/festival.model';
import { map, share, shareReplay } from 'rxjs/operators';
import { Role } from '../models/role.model';
import { Resource } from '../models/resource.model';
import { PlaceMatch } from '../models/placematch.model';
import { Person } from '../models/person.model';
import { WorkMatch } from '../models/workmatch.model';
import { PersonMatchAuthor } from '../models/personmatchauthor.model';
import { Group } from '../models/group.model';
import { Membership } from '../models/membership.model';

@Injectable({
  providedIn: 'root',
})
export class KnoraService {
  knoraApiConnection: KnoraApiConnection;
  config: KnoraApiConfig;
  cachedCalendar: CacheCalendarYear[];
  cachedCalendarExtended: CacheCalendarYear[];
  cachedRepresentation: Map<string, Representation> = new Map<string, Representation>();
  cachedYears: Map<number, RepresentationMatch[]> = new Map<number, RepresentationMatch[]>();
  cachedPlaces: PlaceMatch[];
  cachedAuthors: PersonMatchAuthor[];
  cachedWorks: Work[];
  cachedWorkMatches: WorkMatch[];
  cache: Map<string, Map<string, Object>> = new Map<string, Map<string, Object>>();

  constructor() {
    this.config = new KnoraApiConfig(
      environment.knoraApiProtocol as 'http' | 'https',
      environment.knoraApiHost,
      environment.knoraApiPort,
      undefined,
      undefined,
      true
    );
    this.knoraApiConnection = new KnoraApiConnection(this.config);
  }

  // get a page of results
  getCalendarCache(page: number): Observable<CacheCalendarYear[]> {
    const gravsearchQuery1 = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
PREFIX theatre-societe: <${environment.knoraApiProtocol}://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>

CONSTRUCT {
    ?calendarYear knora-api:isMainResource true .
    ?calendarYear theatre-societe:cacheCalendarYearHasYear ?year .
    ?calendarYear theatre-societe:cacheCalendarYearHasRepresentations ?representations .
} WHERE {
	?calendarYear a knora-api:Resource .
    ?calendarYear a theatre-societe:CacheCalendarYear .
    ?calendarYear theatre-societe:cacheCalendarYearHasYear ?year .
    ?calendarYear theatre-societe:cacheCalendarYearHasRepresentations ?representations .
}
ORDER BY ?year
OFFSET 0`;
    const gravsearchQuery = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
PREFIX theatre-societe: <http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>
CONSTRUCT {
  ?calendar knora-api:isMainResource true .
  ?calendar theatre-societe:cacheCalendarYearHasYear ?year .
  ?calendar theatre-societe:cacheCalendarYearHasRepresentations ?representations .
} WHERE {
  ?calendar a knora-api:Resource .
  ?calendar a theatre-societe:CacheCalendarYear .
  ?calendar theatre-societe:cacheCalendarYearHasYear ?year .
  ?calendar theatre-societe:cacheCalendarYearHasRepresentations ?representations .
}
ORDER BY ?year
OFFSET ${page}`;
    console.log(gravsearchQuery);
    return this.knoraApiConnection.v2.search.doExtendedSearch(gravsearchQuery)
      .pipe(
        map((response: ReadResourceSequence) => response.resources.map(
          (resource: ReadResource) => new CacheCalendarYear(resource)
        ))
      );
  }

  // agregate paged results
  getAllCalendarCachePerPage(): Observable<CacheCalendarYear[]> {
    const service = this;
    let page = 0;
    function multiPage(observer) {
      console.log('call getCalendarCache for page: ' + page);
      service.getCalendarCache(page).subscribe(
        (years: CacheCalendarYear[]) => {
          if (years.length > 0) {
            observer.next(years);
            page = page + 1;
            multiPage(observer);
          } else {
            observer.complete();
          }
        }
      );
    }

    return new Observable(multiPage);
  }

  // chain paged results
  getAllCalendarCache(): Observable<CacheCalendarYear[]> {
    // survive variable scope change (`this` might not always be this)
    const service = this;
    // page counter for recursion
    let page = 0;
    // result set (recursively build up)
    let allYears: CacheCalendarYear[] = [];

    // if we already have the final result set, send it straight away
    if (this.cachedCalendar) {
      return of(this.cachedCalendar);
    }

    function aggregatedPage(observer) {
      console.log('call getCalendarCache for page: ' + page);
      service.getCalendarCache(page).subscribe(
        (years: CacheCalendarYear[]) => {
          if (years.length > 0) {
            allYears = allYears.concat(years);
            observer.next(allYears);
            page = page + 1;
            aggregatedPage(observer);
          } else {
            service.cachedCalendar = allYears;
            observer.complete();
          }
        }
      );
    }

    return new Observable(aggregatedPage);
  }

  getAllCalendarCacheExtended(): Observable<CacheCalendarYear[]> {
    // survive variable scope change (`this` might not always be this)
    const service = this;
    // page counter for recursion
    let page = 0;
    const first = 1700;
    let lastProcessed = first;
    const last = 1899;
    let lastYear: CacheCalendarYear;

    // result set (recursively build up)
    let allYearsExtended: CacheCalendarYear[] = [];

    // if we already have the final result set, send it straight away
    if (this.cachedCalendarExtended) {
      return of(this.cachedCalendarExtended);
    }

    function aggregateExtendPage(observer) {
      console.log('call getCalendarCache for page: ' + page);
      service.getCalendarCache(page).subscribe(
        (years: CacheCalendarYear[]) => {
          if (years.length > 0) {
            let countRepresentations = 0;
            // process years
            years.forEach(year => {
              // aggregate representations for years before the first one
              if (+year.label < first) {
                countRepresentations += +year.representations;
                return;
              }
              if (+year.label === first) {
                if (countRepresentations > 0) {
                  year.representations = (countRepresentations + +year.representations).toString();
                }
                allYearsExtended.push(year);
                return;
              }
              // for regular years, fill the blanks if needed
              if (+year.label > (lastProcessed + 1)) {
                for (let i = lastProcessed + 1; i < Math.min(last, +year.label); i++) {
                  const missingYear = new CacheCalendarYear(new ReadResource());
                  missingYear.label = i.toString();
                  missingYear.representations = '0';
                  allYearsExtended.push(missingYear);
                }
              }
              if (+year.label < last) {
                allYearsExtended.push(year);
                lastProcessed = +year.label;
                return;
              }
              // aggregate representations for years after the last one
              if (+year.label === last) {
                lastYear = year;
                return;
              }
              if (+year.label > last) {
                if (!lastYear) {
                  lastYear = new CacheCalendarYear(new ReadResource());
                  lastYear.label = last.toString();
                  lastYear.representations = '0';
                }
                lastYear.representations = (+lastYear.representations + +year.representations).toString();
                return;
              }
            });
            observer.next(allYearsExtended);
            page = page + 1;
            aggregateExtendPage(observer);
          } else {
            if (lastYear) {
              allYearsExtended.push(lastYear);
            }
            service.cachedCalendarExtended = allYearsExtended;
            observer.complete();
          }
        }
      );
    }

    return new Observable(aggregateExtendPage);
  }

  getQueryFilter(year: number): string {
    if (year === 1700) {
      return "FILTER(knora-api:toSimpleDate(?date) < 'GREGORIAN:1701-1-1' ^^ <http://api.knora.org/ontology/knora-api/simple/v2#Date>)";
    }
    if (year === 1899) {
      return "FILTER(knora-api:toSimpleDate(?date) > 'GREGORIAN:1898-12-31' ^^ <http://api.knora.org/ontology/knora-api/simple/v2#Date>)";
    }
    return `FILTER(knora-api:toSimpleDate(?date) = 'GREGORIAN:${year}-1-1:${year}-12-31'^^<http://api.knora.org/ontology/knora-api/simple/v2#Date>)`;
  }

  // representations per year
  getRepresentationsPage(year: number, page: number): Observable<RepresentationMatch[]> {
    const filter = this.getQueryFilter(year);
    const query = `
   PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
   PREFIX theatre-societe: <http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>
   CONSTRUCT {
     ?representation knora-api:isMainResource true .
     ?representation theatre-societe:representationIsBasedOn ?work .
     ?work theatre-societe:workHasTitle ?playTitle .
     ?representation theatre-societe:representationHasPlace ?place .
     ?place theatre-societe:placeHasName ?placeName .
     ?representation theatre-societe:representationHasDate ?date .
   } WHERE {
     ?representation a knora-api:Resource .
     ?representation a theatre-societe:Representation .
     ?representation theatre-societe:representationIsBasedOn ?work .
     ?work theatre-societe:workHasTitle ?playTitle .
     ?representation theatre-societe:representationHasPlace ?place .
     ?place theatre-societe:placeHasName ?placeName .
     ?representation theatre-societe:representationHasDate ?date .
     ${filter}
    }
   ORDER BY ?date
   OFFSET ${page}
   `;
    console.log(query);
    return this.knoraApiConnection.v2.search.doExtendedSearch(query)
      .pipe(
        map((response: ReadResourceSequence) => response.resources.map(
          (resource: ReadResource) => new RepresentationMatch(resource)
        ))
      );
  }


  getRepresentations(year: number): Observable<RepresentationMatch[]> {
    const service = this;
    if (service.cachedYears.has(year)) {
      return of(service.cachedYears.get(year));
    }
    let index = 0;
    let representations: RepresentationMatch[] = [];
    function aggregatedPage(observer) {
      console.log('call getRepresentations for page: ' + index);
      service.getRepresentationsPage(year, index).subscribe(
        (page: RepresentationMatch[]) => {
          if (page.length > 0) {
            representations = representations.concat(page);
            // if needed sort in the request
            // .sort((a, b) => Number(a.label) - Number(b.label));
            observer.next(representations);
            index = index + 1;
            aggregatedPage(observer);
          } else {
            service.cachedYears.set(year, representations);
            observer.complete();
          }
        }
      );
    }
    return new Observable(aggregatedPage);
  }

  getResource<T extends Resource>(iri: string, cname: string, ctor: Function): Observable<T> {
    const service = this;

    // get the cache
    let cache;
    if (!service.cache.has(cname)) {
      cache = new Map<string, T>();
      service.cache.set(cname, cache);
    } else {
      cache = service.cache.get(cname);
    }

    // check the cache
    if (cache.has(iri)) {
       return of(cache.get(iri))
    };

    // send the request
    return service.knoraApiConnection.v2.res.getResource(iri).pipe(
      map((response: ReadResource) => {
        const rep = ctor(response);
        cache.set(iri, rep);
        return rep;
      })
    );
  }

  getRepresentation(iri: string): Observable<Representation> {
    const service = this;
    return service.getResource(iri, "representation", (resource: ReadResource) => new Representation(resource));
  }

  getPlace(iri: string): Observable<Place> {
    const service = this;
    return service.getResource(iri, "place", (resource: ReadResource) => new Place(resource));
  }

  getGenre(iri: string): Observable<Genre> {
    const service = this;
    return service.getResource(iri, "genre", (resource: ReadResource) => new Genre(resource));
  }
  getQuote(iri: string): Observable<Quote> {
    const service = this;
    return service.getResource(iri, "quote", (resource: ReadResource) => new Quote(resource));
  }

  getFestival(iri: string): Observable<Festival> {
    const service = this;
    return service.getResource(iri, "festival", (resource: ReadResource) => new Festival(resource));
  }

  getWork(iri: string): Observable<Work> {
    const service = this;
    return service.getResource(iri, "work", (resource: ReadResource) => new Work(resource));
  }

  getRole(iri: string): Observable<Role> {
    const service = this;
    return service.getResource(iri, "Role", (resource: ReadResource) => new Role(resource));
  }

  getPerson(iri: string): Observable<Person> {
    const service = this;
    return service.getResource(iri, "Person", (resource: ReadResource) => new Person(resource));
  }

  getGroup(iri: string): Observable<Group> {
    const service = this;
    return service.getResource(iri, "Group", (resource: ReadResource) => new Group(resource));
  }

  getMembership(iri: string): Observable<Membership> {
    const service = this;
    return service.getResource(iri, "Membership", (resource: ReadResource) => new Membership(resource));
  }

  // representations per year
  getPlacePage(page: number): Observable<PlaceMatch[]> {
    const query = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
    PREFIX tds: <http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>

    CONSTRUCT {
      ?place knora-api:isMainResource true .
      ?place tds:placeHasName ?name .
      ?place tds:placeHasCoordinates ?coord .
      ?place tds:placeHasNotice ?notice .
    } WHERE {
      ?place a knora-api:Resource .
      ?place a tds:Place .
      ?place tds:placeHasName ?name .
      ?place tds:placeHasCoordinates ?coord .
      OPTIONAL {
        ?place tds:placeHasNotice ?notice .
      }
    }
    OFFSET ${page}
    `;
    console.log('query places:');
    console.log(query);
    return this.knoraApiConnection.v2.search.doExtendedSearch(query)
      .pipe(
        map((response: ReadResourceSequence) => response.resources.map(
          (resource: ReadResource) => new PlaceMatch(resource)
        ))
      );
  }

  getPlaces(): Observable<PlaceMatch[]> {
    const service = this;
    if (service.cachedPlaces) {
      return of(service.cachedPlaces);
    }
    let index = 0;
    let matches: PlaceMatch[] = [];
    function aggregatedPage(observer) {
      console.log('call getPlace for page: ' + index);
      service.getPlacePage(index).subscribe(
        (page: PlaceMatch[]) => {
          if (page.length > 0) {
            matches = matches.concat(page);
            // if needed sort in the request
            // .sort((a, b) => Number(a.label) - Number(b.label));
            observer.next(matches);
            index = index + 1;
            aggregatedPage(observer);
          } else {
            service.cachedPlaces = matches;
            observer.complete();
          }
        }
      );
    }
    return new Observable(aggregatedPage);
  }

  getAuthorPage(page: number): Observable<PersonMatchAuthor[]> {
    const query = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
    PREFIX tds: <http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>

    CONSTRUCT {
      ?author knora-api:isMainResource true .
      ?author tds:hasPseudonym ?pseudo .
      ?author tds:hasFamilyName ?family .
      ?author tds:hasGivenName ?given .
    } WHERE {
      ?author a knora-api:Resource .
      ?author a tds:Person .
      OPTIONAL {
        ?author tds:hasPseudonym ?pseudo .
      }
      OPTIONAL {
        ?author tds:hasFamilyName ?family .
      }
      OPTIONAL {
        ?author tds:hasGivenName ?given .
      }
      ?work a tds:Work .
      ?work tds:workHasAuthor ?author
    }
    OFFSET ${page}
    `;
    console.log('query authors:');
    console.log(query);
    return this.knoraApiConnection.v2.search.doExtendedSearch(query)
      .pipe(
        map((response: ReadResourceSequence) => response.resources.map(
          (resource: ReadResource) => new PersonMatchAuthor(resource)
        ))
      );
  }

  getAuthors(): Observable<PersonMatchAuthor[]> {
    const service = this;
    if (service.cachedAuthors) {
      return of(service.cachedAuthors);
    }
    let index = 0;
    let authors: PersonMatchAuthor[] = [];
    function aggregatedPage(observer) {
      console.log('call getAuthors for page: ' + index);
      service.getAuthorPage(index).subscribe(
        (page: PersonMatchAuthor[]) => {
          if (page.length > 0) {
            authors = authors.concat(page);
            observer.next(authors);
            index = index + 1;
            aggregatedPage(observer);
          } else {
            service.cachedAuthors = authors;
            observer.complete();
          }
        }
      );
    }
    return new Observable(aggregatedPage);
  }

  getWorksPage(page: number): Observable<WorkMatch[]> {
    const query = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
    PREFIX tds: <http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>

    CONSTRUCT {
      ?work knora-api:isMainResource true .
      ?work tds:workHasTitle ?title .
      ?work tds:workHasAuthor ?author .
      ?author tds:hasFamilyName ?name
    } WHERE {
      ?work a knora-api:Resource .
      ?work a tds:Work .
      OPTIONAL {
        ?work tds:workHasTitle ?title .
      }
      OPTIONAL {
        ?work tds:workHasAuthor ?author .
        ?author tds:hasFamilyName ?name
      }
    }
    ORDER BY ?title
    OFFSET ${page}
    `;
    console.log('query works:');
    console.log(query);
    return this.knoraApiConnection.v2.search.doExtendedSearch(query)
      .pipe(
        map((response: ReadResourceSequence) => response.resources.map(
          (resource: ReadResource) => new WorkMatch(resource)
        ))
      );
  }

  getWorks(): Observable<WorkMatch[]> {
    const service = this;
    if (service.cachedWorkMatches) {
      return of(service.cachedWorkMatches);
    }
    let index = 0;
    let works: WorkMatch[] = [];
    function aggregatedPage(observer) {
      console.log('call getWorks for page: ' + index);
      service.getWorksPage(index).subscribe(
        (page: WorkMatch[]) => {
          // // note loic: for debug
          // if( index > 5 ) {
          //   service.cachedWorkMatches = works;
          //   observer.complete();
          // };

          if (page.length > 0) {
            works = works.concat(page);
            observer.next(works);
            index = index + 1;
            aggregatedPage(observer);
          } else {
            service.cachedWorkMatches = works;
            observer.complete();
          }
        }
      );
    }
    return new Observable(aggregatedPage);
  }

}
