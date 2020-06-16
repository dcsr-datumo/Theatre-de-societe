import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from "src/environments/environment";

export class CacheCalendarYear extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get representations(): string {
    return this.getFirstValueAsStringOrNullOfProperty(
      `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#cacheCalendarYearHasRepresentations`
    );
  }
}
