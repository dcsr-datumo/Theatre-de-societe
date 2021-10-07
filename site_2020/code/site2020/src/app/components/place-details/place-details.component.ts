import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';
import { KnoraService } from 'src/app/services/knora.service';


/**
 * Place details:
 * right pannel of the map
 * it shows the details of a place
 * differs from the place component in the way it gets the place to display
 */

@Component({
  selector: 'tds-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  id : string;
  place : Observable<Place>;
  title=true;

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.place = this.knoraService.placeDetails.pipe(
      switchMap((iri: string) => { return this.knoraService.getPlace(iri) } )
    )
  }

  getRepresentations(iri: string) {
    return this.knoraService.getRepresentationsByLink(iri, "place");
  }
}
