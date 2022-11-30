import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WorkCache } from 'src/app/models/workcache.model';

@Component({
  selector: 'tds-piecespage',
  templateUrl: './piecespage.component.html',
  styleUrls: ['./piecespage.component.scss']
})
export class PiecespageComponent implements OnInit {
  @Input()
  works: WorkCache[];
  @Input()
  reset: Subject<number>;
  count: number;

  page = 0;
  pageMax = 0;

  panel = new Map<string, boolean>();

  pageLength = 25;

  constructor() { }

  ngOnInit(): void {
    this.page = 0;
    this.count = 1;

    const us = this;
    this.reset.subscribe(
      newCount => {
        us.count = newCount;
        us.page = 0;
        us.pageMax = Math.ceil(newCount / us.pageLength);
      }
    );
    this.reset.next(this.works.length);
  }

  updatePage(value: number) {
    this.page = this.page + value;
  }
  firstPage() {
    this.page = 0;
  }
  lastPage() {
    this.page = this.pageMax - 1;
  }
}
