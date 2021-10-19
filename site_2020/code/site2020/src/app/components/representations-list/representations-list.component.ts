import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';
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
  representations: Observable<RepresentationMatch[]>;
  subscription;

  constructor(
    private knoraService: KnoraService
  ){}

  ngOnInit(): void {
    if (this.type == "year") {
      this.representations = this.knoraService.getRepresentationsByYear(+this.source)
      // .pipe(
      //   map((representations: RepresentationMatch[]) =>
      //     representations.map((representation: RepresentationMatch) => {
      //       // by default, fold in the elements
      //       this.panel[representation.id] = false;
      //     })
      //   )
      // )
      ;

    } else {
      this.representations = this.knoraService.getRepresentationsByLink(this.source, this.type)
      // .pipe(
      //   map((representations: RepresentationMatch[]) =>
      //     representations.map((representation: RepresentationMatch) => {
      //       // by default, fold in the elements
      //       this.panel[representation.id] = false;
      //     })
      //   )
      // )
      ;

      // special case for maps, listen to place details or the list is not updated
      this.subscription = this.knoraService.placeDetails.subscribe(
        (update: string) => {
          console.log("change detected on: "+ update);
          this.representations = this.knoraService.getRepresentationsByLink(update, "place");
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
