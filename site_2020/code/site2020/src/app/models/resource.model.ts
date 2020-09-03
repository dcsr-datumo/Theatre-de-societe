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

  get ark(): string {
    return this.readResource.arkUrl;
  }

  get label(): string {
    return this.readResource.label;
  }

  getFirstValueAsStringOrNullOfProperty(property: string) {
    console.log(this.readResource);
    console.log(property);
    const values: string[] = this.readResource
      ? this.readResource.getValuesAsStringArray(property)
      : null;
    console.log(values);
    return values && values.length >= 1 ? values[0] : null;
  }
}
