import { Injectable } from "@angular/core";
import {
  KnoraApiConfig,
  KnoraApiConnection,
  ApiResponseError,
  ReadResourceSequence,
} from "@knora/api";
import { Observable, config } from "rxjs";
import { environment } from "src/environments/environment";

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

  getCalendarCache(): Observable<ReadResourceSequence | ApiResponseError> {
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
PREFIX theatre-societe: <http://api-test2.unil.ch/ontology/0103/theatre-societe/v2#>
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
OFFSET 0`;
    console.log(gravsearchQuery);
    return this.knoraApiConnection.v2.search.doExtendedSearch(gravsearchQuery);
  }
}
