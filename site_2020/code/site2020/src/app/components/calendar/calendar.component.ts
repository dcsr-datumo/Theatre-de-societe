import { Component, OnInit } from "@angular/core";
import { KnoraService } from "../../services/knora.service";
import {
  ReadResource,
  ReadResourceSequence,
  ApiResponseError,
} from "@dasch-swiss/dsp-js";

import { Observable, config, of } from "rxjs";
import { map } from "rxjs/operators";
import { CacheCalendarYear } from '../../models/cache-calendar-year.model';

@Component({
  selector: "tds-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  years: Observable<CacheCalendarYear[]>;
  loading: Observable<boolean>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.loading = of(true);
    this.years = this.knoraService.getAllCalendarCacheExtended(() => this.loading = of(false));
  }

}
