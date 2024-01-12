import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';
import { ConvertStandofPipe } from '../pipes/convert-standof.pipe';

export class PlaceMatch extends Resource {
  private converter = new ConvertStandofPipe();

  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get place(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasCoordinates`);
  }

  get latLong(): number[] {
    const place = this.place;

    if (!place)
      { return []; }

    const spnb: string[] = this.place.split(',');
    return spnb.map( s => Number(s) );
  }

  get name(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasName`);
  }

  get notice(): string {
    // arbitrarily grab the first value
    const notice =  this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasNotice`);
    return this.converter.transform(notice);
  }
}
