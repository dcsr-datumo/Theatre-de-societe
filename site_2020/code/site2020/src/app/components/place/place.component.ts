import { Component, OnInit, Input } from '@angular/core';
import { Observable, config } from "rxjs";

import { KnoraService } from "../../services/knora.service";
import { Place } from '../../models/place.model';
import { ActivatedRoute } from '@angular/router';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';


@Component({
  selector: 'tds-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  id : string;
  place : Observable<Place>;
  representations : Observable<RepresentationMatch[]>;
  title=true;

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('place');
    let iri = `http://rdfh.ch/0103/${this.id}`;
    this.place = this.knoraService.getPlace(iri);
    this.representations = this.knoraService.getRepresentationsByLink(iri);
  }

}
