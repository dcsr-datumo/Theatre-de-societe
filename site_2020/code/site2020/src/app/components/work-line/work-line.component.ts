import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { KnoraService } from 'src/app/services/knora.service';
import { Work } from 'src/app/models/work.model';
import { RepresentationMatch } from 'src/app/models/representationmatch.model';

@Component({
  selector: 'tds-work-line',
  templateUrl: './work-line.component.html',
  styleUrls: ['./work-line.component.scss']
})
export class WorkLineComponent implements OnInit {
  @Input() iri : string;
  work: Observable<Work>;

  constructor(
    private knoraService: KnoraService,
  ) { }

  ngOnInit(): void {
    this.work = this.knoraService.getWork(this.iri);
  }

  getRepresentations(iri: string): Observable<RepresentationMatch[]> {
    return this.knoraService.getRepresentationsByLink(this.iri, "work");
  }
}
