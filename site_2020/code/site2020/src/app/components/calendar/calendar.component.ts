import { Component, OnInit } from "@angular/core";
import { KnoraService } from "../../services/knora.service";
import {
  ReadResource,
  ReadResourceSequence,
  ApiResponseError,
} from "@dasch-swiss/dsp-js";

import { Observable, config } from "rxjs";
import { map } from "rxjs/operators";
import { CacheCalendarYear } from '../../models/cache-calendar-year.model';

@Component({
  selector: "tds-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  years: Observable<CacheCalendarYear[]>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.years = this.knoraService.getAllCalendarCache();
  }

}
