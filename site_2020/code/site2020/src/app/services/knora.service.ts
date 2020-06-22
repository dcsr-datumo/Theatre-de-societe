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
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class KnoraService {
  knoraApiConnection: KnoraApiConnection;
  config: KnoraApiConfig;

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
            allYears = allYears.concat(years).sort((a, b) => Number(a.label) - Number(b.label));
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
}
