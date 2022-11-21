import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { Representation } from 'src/app/models/representation.model';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';
import { Work } from 'src/app/models/work.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: "tds-representations-list",
  templateUrl: "./representations-list.component.html",
  styleUrls: ["./representations-list.component.scss"],
})
export class RepresentationsListComponent implements OnInit {
  @Input()
  source: string;
  @Input()
  type: string;
  @Input()
  header: boolean;
  @Input()
  titles: boolean;
  panel: Map<string, boolean> = new Map<string, boolean>();
  representations: Observable<Representation[]>;
  works: Map<string, Observable<Work>> = new Map<string, Observable<Work>>();
  places: Map<string, Observable<Place>> = new Map<string, Observable<Place>>();

  constructor(
    private knoraService: KnoraService
  ){}

  ngOnInit(): void {
    console.log("start representations");

    const us = this;

    const myTap = tap( (representations: Representation[]) => {
      representations.map( (representation : Representation) => {
        // get the representations' work
        us.works[representation.work] = us.knoraService.getWork(representation.work);
        // get the representation's place
        us.places[representation.place] = us.knoraService.getPlace(representation.place);
      });
    })

    if (this.type == "year") {
      this.representations = this.knoraService.getRepresentationsByYear(+this.source).pipe(myTap);

    } else {
      this.representations = this.knoraService.getRepresentationsByLink(this.source, this.type).pipe(myTap);
    }

  }

  ngOnDestroy() {
  }
}
