import { Component, Input, OnInit } from '@angular/core';
import { CacheCalendarYear } from 'src/app/models/cache-calendar-year.model';

@Component({
  selector: 'tds-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
  @Input()
  year: CacheCalendarYear;

  constructor() { }

  ngOnInit(): void {
  }

}
