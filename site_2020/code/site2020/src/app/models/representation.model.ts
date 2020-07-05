import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from "../../environments/environment";

export class Representation extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get date(): string {
    return this.getFirstValueAsStringOrNullOfProperty(
      `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#representationHasDate`
    );
  }
}
