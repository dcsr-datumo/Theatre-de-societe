import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Author extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

}
