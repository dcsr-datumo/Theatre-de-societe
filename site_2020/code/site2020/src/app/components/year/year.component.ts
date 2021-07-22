import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tds-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
  @Input()
  year: number;
  @Input()
  representations: number;

  constructor() { }

  ngOnInit(): void {
  }

}
