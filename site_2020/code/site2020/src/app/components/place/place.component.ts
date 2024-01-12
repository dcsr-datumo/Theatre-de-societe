import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KnoraService } from '../../services/knora.service';
import { Place } from '../../models/place.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tds-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  id: string;
  place: Observable<Place>;
  iri: string;
  title = true;

  constructor(private route: ActivatedRoute, private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('place');
    this.iri = `http://rdfh.ch/0103/${this.id}`;
    this.place = this.knoraService.getPlace(this.iri);
  }

}
