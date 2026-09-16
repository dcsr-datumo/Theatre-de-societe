import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class RepresentationMatch extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  tds = `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#`;

  get dateRaw(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${this.tds}representationHasDate`);
  }

  get dateShort(): string {
    return this.getDateShort(`${this.tds}representationHasDate`);
  }

  get workTitle(): string {
    return this.getLinkedValue(`${this.tds}representationIsBasedOnValue`, `${this.tds}workHasTitle`);
  }

  get placeName(): string {
    return this.getLinkedValue(`${this.tds}representationHasPlaceValue`, `${this.tds}placeHasName`);
  }
}
