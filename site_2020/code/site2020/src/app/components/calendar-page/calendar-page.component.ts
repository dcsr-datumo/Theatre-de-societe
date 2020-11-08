import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, config } from "rxjs";

import { KnoraService } from "../../services/knora.service";
import { RepresentationMatch } from '../../models/representationmatch.model';

@Component({
  selector: 'tds-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
  year: number;
  representations: Observable<RepresentationMatch[]>;

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.year = +this.route.snapshot.paramMap.get('year');
    this.representations = this.knoraService.getRepresentations(this.year);
  }

}
