import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';
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
  representations: Observable<RepresentationMatch[]>;
  subscription;

  constructor(
    private knoraService: KnoraService
  ){}

  ngOnInit(): void {
    // special case for maps, listen to place details or the list is not updated
    this.subscription = this.knoraService.placeDetails.subscribe(
      (update: string) => {
        console.log("change detected on: "+ update);
        this.representations = this.knoraService.getRepresentationsByLink(update, "place");
      }
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
