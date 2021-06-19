import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';

@Component({
  selector: 'tds-representations-list',
  templateUrl: './representations-list.component.html',
  styleUrls: ['./representations-list.component.scss']
})
export class RepresentationsListComponent implements OnInit {
  @Input()
  representations: Observable<RepresentationMatch[]>;
  @Input()
  header: boolean;
  @Input()
  titles: boolean;
  panelledRepresentations: Observable<RepresentationMatch[]>;
  panel: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  ngOnInit(): void {
    this.panelledRepresentations = this.representations
      .pipe(
        map( (representations: RepresentationMatch[]) =>
          representations.map( (representation: RepresentationMatch) =>
            {
              this.panel[representation.id] = false;
              return representation;
            }
          )
        )
      );
  }

}
