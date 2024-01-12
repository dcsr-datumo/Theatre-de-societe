import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

/**
 * Result of a Work search
 */
export class WorkMatch extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get author(): string {
    const authorProperty = `${environment.baseOntology}workHasAuthorValue`;
    const nameProperty = `${environment.baseOntology}hasFamilyName`;
    return this.getLinkedValue(authorProperty, nameProperty);
  }

  get title(): string {
    const property = `${environment.baseOntology}workHasTitle`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }
}
