import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { ConvertStandofPipe } from '../pipes/convert-standof.pipe';
import { environment } from '../../environments/environment';

export class Quote extends Resource {
  private converter = new ConvertStandofPipe();

  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  get source(): string {
    let source = this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}quoteHasSource`);
    // quoteHasSourceValue
    return this.converter.transform(source);
  }

  get volume(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}quoteHasVolume`);
  }

  get numPage(): string {
    return this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}quoteHasNumPage`);
  }

  get quote(): string {
    let quote = this.getFirstValueAsStringOrNullOfProperty(`${environment.baseOntology}hasQuote`);
    // quoteHasSourceValue
    return this.converter.transform(quote);
  }

}
