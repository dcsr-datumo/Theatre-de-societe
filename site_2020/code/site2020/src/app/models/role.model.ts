import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';

export class Role extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }
}
