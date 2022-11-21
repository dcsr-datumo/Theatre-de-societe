import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';
import { ConvertStandofPipe } from '../pipes/convert-standof.pipe';

export class Place extends Resource {
  private converter = new ConvertStandofPipe();

  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get name(): string {
    const property = `${environment.baseOntology}placeHasName`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get coordinates(): string {
    const property = `${environment.baseOntology}placeHasCoordinates`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get notices(): string[] {
    const property = `${environment.baseOntology}placeHasNotice`;
    let values = this.getValues(property);
    if (!values) return null;
    return values.map( notice => this.converter.transform(notice));
  }

  get links() {
    // TODO: is empty :(
    return this.readResource.incomingReferences;
  }
}
