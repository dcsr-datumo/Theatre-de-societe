import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Place extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get name(): string {
    const property = `${environment.baseOntology}placeHasName`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get coordinates(): string {
    const property = `${environment.baseOntology}placeHasCoordinates`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get notice(): string {
    const property = `${environment.baseOntology}placeHasNotice`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }
}
