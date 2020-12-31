import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';
import { KnoraService } from '../services/knora.service';
import { ConvertStandofPipe } from '../pipes/convert-standof.pipe';
import { retry } from 'rxjs/operators';
import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';

export class PlaceMatch extends Resource {
  private converter = new ConvertStandofPipe();

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
    let notice =  this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}placeHasNotice`);
    return this.converter.transform(notice);
  }
}
