import { Injectable } from "@angular/core";
import {
  KnoraApiConfig,
  KnoraApiConnection,
  ApiResponseError,
  ReadResourceSequence,
  ReadResource,
} from "@dasch-swiss/dsp-js";
import { Observable, config } from "rxjs";
import { environment } from "src/environments/environment";
import { CacheCalendarYear } from '../models/cache-calendar-year.model';
import { Representation } from '../models/representation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class KnoraService {
  knoraApiConnection: KnoraApiConnection;
  config: KnoraApiConfig;
  cachedCalendar: CacheCalendarYear[];

  constructor() {
    this.config = new KnoraApiConfig(
      environment.knoraApiProtocol as "http" | "https",
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
      console.log("call getCalendarCache for page: " + page);
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
    const service = this;
    let page = 0;
    let allYears: CacheCalendarYear[] = [];
    function agregtedPage(observer) {
      console.log("call getCalendarCache for page: " + page);
      service.getCalendarCache(page).subscribe(
        (years: CacheCalendarYear[]) => {
          if (years.length > 0) {
            allYears = allYears.concat(years);
            observer.next(allYears);
            page = page + 1;
            agregtedPage(observer);
          } else {
            observer.complete();
          }
        }
      );
    }

    return new Observable(agregtedPage);
  }


  // representations per year
  getRepresentationsPage(year: number, page: number): Observable<Representation[]> {
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
     FILTER(knora-api:toSimpleDate(?date) = "GREGORIAN:${year}-1-1:${year}-12-31"^^<http://api.knora.org/ontology/knora-api/simple/v2#Date>)
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
    function agregtedPage(observer) {
      console.log("call getRepresentations for page: " + index);
      service.getRepresentationsPage(year, index).subscribe(
        (page: Representation[]) => {
          if (page.length > 0) {
            representations = representations.concat(page).sort((a, b) => Number(a.label) - Number(b.label));
            observer.next(representations);
            index = index + 1;
            agregtedPage(observer);
          } else {
            observer.complete();
          }
        }
      );
    }
    return new Observable(agregtedPage);
  }

}
