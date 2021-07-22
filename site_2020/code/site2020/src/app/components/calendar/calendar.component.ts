import { Component, OnInit } from "@angular/core";
import { KnoraService } from "../../services/knora.service";

@Component({
  selector: "tds-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  yearsQC: number[];
  outliers: number;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.yearsQC = this.knoraService.getCalendarQuickCache();
    // Note loic: for now remove outliers
    this.outliers = this.yearsQC.shift();
  }

}
