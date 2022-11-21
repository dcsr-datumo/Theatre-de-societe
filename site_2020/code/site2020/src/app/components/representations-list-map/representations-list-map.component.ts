import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { Representation } from 'src/app/models/representation.model';
import { Work } from 'src/app/models/work.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-representations-list-map',
  templateUrl: '../representations-list/representations-list.component.html',
  styleUrls: ['./representations-list-map.component.scss']
})
export class RepresentationsListMapComponent implements OnInit {
  @Input()
  source: string;
  type = "place";
  header = true;
  titles = "title";
  panel: Map<string, boolean> = new Map<string, boolean>();
  representations: Observable<Representation[]>;
  subscription;
  works: Map<string, Observable<Work>> = new Map<string, Observable<Work>>();
  places: Map<string, Observable<Place>> = new Map<string, Observable<Place>>();

  constructor(
    private knoraService: KnoraService
  ){}

  ngOnInit(): void {
    // special case for maps, listen to place details or the list is not updated
    const us = this;
    this.subscription = this.knoraService.placeDetails.subscribe(
      (update: string) => {
        console.log("change detected on: "+ update);
        this.representations = this.knoraService.getRepresentationsByLink(update, "place")
        .pipe(
          tap( (representations: Representation[]) => {
            representations.forEach(
              (representation: Representation) => {
                console.log("works adding: "+ representation.work);
                us.works[representation.work] = us.knoraService.getWork(representation.work);
              }
            )
          })
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
