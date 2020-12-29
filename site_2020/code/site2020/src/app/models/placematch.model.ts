import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class PlaceMatch extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get place(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasCoordinates`);
  }

  get latLong(): number[] {
    let place = this.place;

    if (!place)
      return [];

    let spnb: string[] = this.place.split(',');
    return spnb.map( s => Number(s) );
  }

  get name(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasName`);
  }

  get notice(): string {
    // arbitrarily grab the first value
    let firstNotice = this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasNotice`);
    if (firstNotice) {
      // strip out the '<xml...' part
      let matches = firstNotice.match('<text>.*');
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    return "";
  }
}
