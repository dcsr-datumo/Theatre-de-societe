// stolen from @gfoo
import { ReadResource } from '@dasch-swiss/dsp-js';
import { environment } from '../../environments/environment';

export class Resource {
  constructor(protected readResource: ReadResource) {}

  get id(): string {
    return this.readResource.id;
  }

  // get reference : a version of the IRI that is understood by this system
  // take the ID of the IRI
  // IRI: http://rdfh.ch/0103/sB04T1_lRMqJIHQw2atDxA
  get ref(): string {
    return this.id.split('/').pop();
  }

  getIriOf(property: string): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}${property}`);
  }

  getIrisOf(property: string): string[] {
    return this.getValues(`${environment.baseOntology}${property}`);
  }

  get ark(): string {
    return this.readResource.arkUrl;
  }

  get label(): string {
    return this.readResource.label;
  }

  getFirstValueAsStringOrNullOfProperty(property: string) {
    const values: string[] = this.getValues(property);
    return values && values.length >= 1 ? values[0] : null;
  }

  getValues(property: string) {
    const values: string[] = this.readResource
      ? this.readResource.getValuesAsStringArray(property)
      : null;
    return values && values.length >= 1 ? values : null;
  }

  getLinkedValue(linkedProperty: string, valueProperty: string): string {
    const linkedValues = this.readResource.properties[linkedProperty];
    if (!(linkedValues && linkedValues.length >0)) return null;
    const linkedValue = linkedValues[0];
    const value = linkedValue["linkedResource"].properties[valueProperty][0].text;
    return String(value);
  }

  getDateShort(property: string): string {
    let dateValues = this.readResource.getValues(property);
    let dateVal = dateValues[0];
    if (!dateVal) return null;
    let date = dateVal['date'];
    if (!date) return null;
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
