import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Group extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  // owl:cardinality "1"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:groupHasName ],
  get name(): string {
    const property = `${environment.baseOntology}groupHasName`;
    return this.getFirstValueAsStringOrNullOfProperty(property);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:groupHasDate ],
  // TODO: is not a single date
  get date(): string {
    return this.getDateShort('groupHasDate');
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:groupHasPlace ],
  //
  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:groupHasPlaceValue ],
  get places(): string[] {
    const property = `${environment.baseOntology}groupHasPlaceValue`;
    return this.getIrisOf(property);
  }
}
