import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';

@Component({
  selector: "tds-representations-list",
  templateUrl: "./representations-list.component.html",
  styleUrls: ["./representations-list.component.scss"],
})
export class RepresentationsListComponent implements OnInit {
  @Input()
  representations: Observable<RepresentationMatch[]>;
  @Input()
  header: boolean;
  @Input()
  titles: boolean;
  panel: Map<string, boolean> = new Map<string, boolean>();

  constructor() {}

  ngOnInit(): void {
    this.representations.pipe(
      map((representations: RepresentationMatch[]) =>
        representations.map((representation: RepresentationMatch) => {
          // by default, fold in the elements
          this.panel[representation.id] = false;
        })
      )
    );
  }
}
