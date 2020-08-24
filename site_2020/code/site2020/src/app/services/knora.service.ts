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
import { Representation } from '../models/representation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KnoraService {
  knoraApiConnection: KnoraApiConnection;
  config: KnoraApiConfig;
  cachedCalendar: CacheCalendarYear[];
  cachedCalendarExtended: CacheCalendarYear[];

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
  getRepresentationsPage(year: number, page: number): Observable<Representation[]> {
    const filter = this.getQueryFilter(year);
    const query = `
   PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
   PREFIX theatre-societe: <http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#>
   CONSTRUCT {
     ?representation knora-api:isMainResource true .
     ?representation theatre-societe:representationHasDate ?date .
   } WHERE {
     ?representation a knora-api:Resource .
     ?representation a theatre-societe:Representation .
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
          (resource: ReadResource) => new Representation(resource)
        ))
      );
  }


  getRepresentations(year: number): Observable<Representation[]> {
    const service = this;
    let index = 0;
    let representations: Representation[] = [];
    function aggregatedPage(observer) {
      console.log('call getRepresentations for page: ' + index);
      service.getRepresentationsPage(year, index).subscribe(
        (page: Representation[]) => {
          if (page.length > 0) {
            representations = representations.concat(page);
            // if needed sort in the request
            // .sort((a, b) => Number(a.label) - Number(b.label));
            observer.next(representations);
            index = index + 1;
            aggregatedPage(observer);
          } else {
            observer.complete();
          }
        }
      );
    }
    return new Observable(aggregatedPage);
  }

}
