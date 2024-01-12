import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { KnoraService } from '../../services/knora.service';
import { Place } from '../../models/place.model';

@Component({
  selector: 'tds-place-line',
  templateUrl: './place-line.component.html',
  styleUrls: ['./place-line.component.scss']
})
export class PlaceLineComponent implements OnInit {
  @Input() iri: string;
  place: Observable<Place>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.place = this.knoraService.getPlace(this.iri);
  }

}
