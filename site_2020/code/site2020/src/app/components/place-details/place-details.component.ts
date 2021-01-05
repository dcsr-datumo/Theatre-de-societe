import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  id : string;
  place : Observable<Place>;
  representations : Observable<RepresentationMatch[]>;
  title=true;

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('place');
    // let iri = `http://rdfh.ch/0103/${this.id}`;
    let us = this;
    this.place = this.knoraService.getPlaceDetails();
    //this.representations = this.knoraService.getRepresentationsByLink(iri);
  }

}
