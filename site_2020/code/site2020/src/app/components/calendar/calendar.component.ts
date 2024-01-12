import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { KnoraService } from '../../services/knora.service';

@Component({
  selector: 'tds-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  yearsQC: Observable<number[]>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.loading.next(true);
    const us = this;
    this.yearsQC = this.knoraService.getCalendarQuickCache().pipe(
        finalize(() => {us.setLoading(false);})
      );
  }

  setLoading(status:boolean): void {
    this.loading.next(status);
  }
}
