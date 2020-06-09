import { Component, OnInit } from "@angular/core";
import { KnoraService } from "src/app/services/knora.service";
import {
  ReadResource,
  ReadResourceSequence,
  ApiResponseError,
} from "@dasch-swiss/dsp-js";

import { map } from "rxjs/operators";

@Component({
  selector: "tds-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  years: ReadResource[];

  constructor(private knoraService: KnoraService) {}

  ngOnInit(): void {
    this.knoraService.getCalendarCache().subscribe(
      (res: ReadResourceSequence) => {
        console.log(res);
        this.years = res.resources;
      },
      (error: ApiResponseError) => console.log("error: " + error)
    );
  }
}
