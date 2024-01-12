import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RepresentationMatch } from '../../models/representationmatch.model';

@Component({
  selector: 'tds-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
  year: number;
  representations: Observable<RepresentationMatch[]>;
  title = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.year = +this.route.snapshot.paramMap.get('year');
  }

}
