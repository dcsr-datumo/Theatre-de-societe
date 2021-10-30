import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PersonCache } from 'src/app/models/personCache.model';
import { WorkCache } from 'src/app/models/workcache.model';

import { KnoraService } from "../../services/knora.service";

@Component({
  selector: 'tds-auteurspage',
  templateUrl: './auteurspage.component.html',
  styleUrls: ['./auteurspage.component.scss']
})
export class AuteurspageComponent implements OnInit {
  @Input()
  authors: PersonCache[];
  @Input()
  reset: Subject<number>;
  count: number;

  allWorks: WorkCache[];

  page: number = 0;
  pageMax: number = 0;

  panel: Map<string, boolean> = new Map<string, boolean>();

  pageLength: number = 25;

  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.page = 0;
    this.count = 1;

    let us = this;
    console.log("count/pageMax:"+us.count+"/"+us.pageMax);
    this.reset.subscribe(
      newCount => {
        us.count = newCount;
        us.page = 0;
        us.pageMax = Math.ceil(newCount/us.pageLength);
        console.log("count/pageMax:"+newCount+"/"+us.pageMax);
      }
    );
    this.reset.next(this.authors.length);


    us.knoraService.getWorksQuickCache().subscribe(
      (data: WorkCache[]) => {
        us.allWorks = data;
      }
    );

  }

  getWorks(author: string) {
    return this.allWorks.filter(work => work.name === author);
  }

  updatePage(value:number) {
    this.page = this.page + value;
  }
  firstPage() {
    this.page = 0;
  }
  lastPage() {
    this.page = this.pageMax-1;
  }
}
