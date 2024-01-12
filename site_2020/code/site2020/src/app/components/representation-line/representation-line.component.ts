import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { KnoraService } from '../../services/knora.service';
import { Representation } from '../../models/representation.model';

@Component({
  selector: 'tds-representation-line',
  templateUrl: './representation-line.component.html',
  styleUrls: ['./representation-line.component.scss']
})
export class RepresentationLineComponent implements OnInit {
  @Input() iri: string;
  representation: Observable<Representation>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    // get the representation
    this.representation = this.knoraService.getRepresentation(this.iri);
  }

}
