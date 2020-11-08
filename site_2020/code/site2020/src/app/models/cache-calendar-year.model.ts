import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class CacheCalendarYear extends Resource {
  // local proxy value (writeable)
  localRepresentations: string = null;

  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get representations(): string {
    if (!this.localRepresentations) {
      this.localRepresentations = this.getFirstValueAsStringOrNullOfProperty(
        `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#cacheCalendarYearHasRepresentations`
      );
    }

    return this.localRepresentations;
  }

  set representations(value: string) {
    this.localRepresentations = value;
  }

  get label(): string {
    return this.readResource.label;
  }

  set label(value: string) {
    this.readResource.label = value;
  }
}
