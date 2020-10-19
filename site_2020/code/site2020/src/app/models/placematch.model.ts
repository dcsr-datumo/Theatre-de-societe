import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export class PlaceMatch extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get place(): string {
    return this.getFirstValueAsStringOrNullOfProperty(
      `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#placeHasCoordinates`
    );
  }

  get latLong(): number[] {
    let place = this.place;

    if (!place)
      return [];

    let spnb: string[] = this.place.split(',');
    return spnb.map( s => Number(s) );
  }

  get name(): string {
    return this.getFirstValueAsStringOrNullOfProperty(
      `http://${environment.knoraApiHost}/ontology/0103/theatre-societe/v2#placeHasName`
    );
  }
}
