import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Person extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasBirthDate ],
  get birthDate(): string {
    const property = `${environment.baseOntology}hasBirthDate`;
    return this.getDateShort(property);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasDeathDate ],
  get deathDate(): string {
    const property = `${environment.baseOntology}hasDeathDate`;
    return this.getDateShort(property);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasFamilyName ],
  get familyName(): string[] {
    const property = `${environment.baseOntology}hasFamilyName`;
    return this.getValues(property);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasPseudonym ],
  get pseudonym(): string[] {
    const property = `${environment.baseOntology}hasPseudonym`;
    return this.getValues(property);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasMembership ],
  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasMembershipValue ],
  get membership(): string[] {
    const property = `${environment.baseOntology}hasMembershipValue`;
    return this.getValues(property);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:hasGivenName ],
  get givenName(): string[] {
    const property = `${environment.baseOntology}hasGivenName`;
    return this.getValues(property);
  }
}
