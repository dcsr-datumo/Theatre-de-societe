import { ReadResource } from '@dasch-swiss/dsp-js';
import { Resource } from './resource.model';
import { environment } from '../../environments/environment';

export class Membership extends Resource {
  constructor(protected readResource: ReadResource) {
    super(readResource);
  }

  // owl:minCardinality "0"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:membershipHasDate ],
  get date(): string {
    const property = `${environment.baseOntology}membershipHasDate`;
    return this.getDateShort(property);
  }

  // owl:cardinality "1"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:isMembershipIn ],
  // owl:cardinality "1"^^xsd:nonNegativeInteger ;
  // owl:onProperty theatre-societe:isMembershipInValue ],
  get group(): string {
    return this.getIriOf('isMembershipInValue');
  }
}
