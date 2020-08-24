import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Representation extends Resource {
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
    const date = this.readResource.getValues(dateProp);
    return String(date['day']) + '/' + String(date['month']) + '/' + String(date['year']);
  }

  get work(): string {
    // workout the property
    const workProp = `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#representationIsBasedOn`;
    // get the id
    const workId: ReadValue[] = this.readResource.getValues(workProp);
    return this.getFirstValueAsStringOrNullOfProperty(workProp);
  }

  get place(): string {
    return this.getFirstValueAsStringOrNullOfProperty(
      `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#representationHasPlace`
    );
  }
}
