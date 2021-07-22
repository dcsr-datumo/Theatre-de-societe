import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, config, of } from "rxjs";

import { KnoraService } from "../../services/knora.service";
import { RepresentationMatch } from '../../models/representationmatch.model';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'tds-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
  year: number;
  representations: Observable<RepresentationMatch[]>;
  title = false;
  loading: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loading = of(true);
    this.year = +this.route.snapshot.paramMap.get('year');
    this.representations = this.knoraService.getRepresentationsByYear(this.year).pipe(finalize(() => this.loading = of(false)));
  }

}
