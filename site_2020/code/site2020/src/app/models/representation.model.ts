import { ReadResource, ReadValue } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

// Representation
// representationHasDate          ->1? date
// representationHasGenre         ->*? Genre
// representationHasPlace         ->1? Place
// representationHasQuote         ->*? Quote
// representationHasRole          ->*? Role
// representationIsBasedOn        ->1  Work
// representationIsPartOfFestival ->1? Festival
export class Representation extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  // date accessors

  get dateRaw(): string {
    const property = `${environment.baseOntology}representationHasDate`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  get dateShort(): string {
    const property = `${environment.baseOntology}representationHasDate`;
    let dateValues = this.readResource.getValues(property);
    let date = dateValues[0]['date']; // [0] -> no check: date is mandatory
    let result = String(date['year']);
    if (date['month']) {
      result = String(date['month']) + '/' + result;
    }
    if (date['day']) {
      result = String(date['day']) + '/' + result;
    }
    return result;
  }

  get work(): string {
    return this.getIriOf('representationIsBasedOnValue');
  }

  get place(): string {
    return this.getIriOf('representationHasPlaceValue');
  }

  get quote(): string {
    return this.getIriOf('representationHasQuoteValue');
  }

  get role(): string {
    return this.getIriOf('representationHasRoleValue');
  }

  get festival(): string {
    return this.getIriOf('representationIsPartOfFestivalValue');
  }

}
