import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

/**
 * Result of a PersonMatchAuthor search
 */
export class PersonMatchAuthor extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get pseudonym(): string {
    const property = `${environment.baseOntology}hasPseudonym`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get familyName(): string {
    const property = `${environment.baseOntology}hasFamilyName`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get givenName(): string {
    const property = `${environment.baseOntology}hasGivenName`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }
}
