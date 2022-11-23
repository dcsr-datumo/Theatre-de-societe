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
    return this.getDateShort(property);
  }

  get year(): number {
    const property = `${environment.baseOntology}representationHasDate`;
    const dateValues = this.readResource.getValues(property);
    const date = dateValues[0]['date']; // [0] -> no check: date is mandatory
    return date['year'];
  }

  get scaledYear(): number {
    const year = this.year;
    if (year < 1700) { return 1700; }
    if (year > 1899) { return 1899; }
    return year;
  }

  get work(): string {
    return this.getIriOf('representationIsBasedOnValue');
  }

  get place(): string {
    return this.getIriOf('representationHasPlaceValue');
  }

  get quote(): string[] {
    return this.getIrisOf('representationHasQuoteValue');
  }

  get role(): string[] {
    return this.getIrisOf('representationHasRoleValue');
  }

  get festival(): string {
    return this.getIriOf('representationIsPartOfFestivalValue');
  }

  get genre(): string[] {
    return this.getIrisOf('representationHasGenreValue');
  }

}
