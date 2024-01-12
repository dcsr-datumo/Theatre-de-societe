import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';

export class Festival extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }
}
