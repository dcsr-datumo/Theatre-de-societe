import { Component, OnInit, Input } from '@angular/core';
import { Observable, config } from "rxjs";

import { KnoraService } from "../../services/knora.service";
import { Place } from '../../models/place.model';


@Component({
  selector: 'tds-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  @Input() iri : string;
  place : Observable<Place>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.place = this.knoraService.getPlace(this.iri);
  }

}
