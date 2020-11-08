import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class RepresentationMatch extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get dateRaw(): string {
    const dateProp = `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#representationHasDate`;
    return this.getFirstValueAsStringOrNullOfProperty(
      `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#representationHasDate`
    );
  }

  get dateShort(): string {
    const dateProp = `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#representationHasDate`;
    const dateValues = this.readResource.getValues(dateProp);
    const firstDate = dateValues.pop();
    const date = firstDate["date"];
    let result = String(date['year']);
    if (date['month']) {
      result = String(date['month']) + '/' + result;
    }
    if (date['day']) {
      result = String(date['day']) + '/' + result;
    }
    return result;
  }

}
