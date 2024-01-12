import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';

// Genre
export class Genre extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }
}
