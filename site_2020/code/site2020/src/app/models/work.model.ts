import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Work extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get authors(): string[] {
    return this.getIrisOf('workHasAuthorValue');
  }

  get title(): string {
    const property = `${environment.baseOntology}workHasTitle`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get authority(): string {
    const property = `${environment.baseOntology}workHasAuthority`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }
}
