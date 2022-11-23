import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
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
    const dateValues = this.readResource.getValues(`${this.tds}representationHasDate`);
    if (!(dateValues && dateValues.length > 0)) { return ''; }

    const firstDate = dateValues[0];
    const date = firstDate['date'];
    let result = String(date['year']);
    if (date['month']) {
      result = String(date['month']) + '/' + result;
    }
    if (date['day']) {
      result = String(date['day']) + '/' + result;
    }
    return result;
  }

  get workTitle(): string {
    return this.getLinkedValue(`${this.tds}representationIsBasedOnValue`, `${this.tds}workHasTitle`);
  }

  get placeName(): string {
    return this.getLinkedValue(`${this.tds}representationHasPlaceValue`, `${this.tds}placeHasName`);
  }
}
