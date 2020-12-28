import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from 'src/app/models/membership.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-membership-line',
  templateUrl: './membership-line.component.html',
  styleUrls: ['./membership-line.component.scss']
})
export class MembershipLineComponent implements OnInit {
  @Input() iri: string;
  membership: Observable<Membership>;

  constructor(
    private knoraService: KnoraService,
  ) { }

  ngOnInit(): void {
    this.membership = this.knoraService.getMembership(this.iri);
  }

}
