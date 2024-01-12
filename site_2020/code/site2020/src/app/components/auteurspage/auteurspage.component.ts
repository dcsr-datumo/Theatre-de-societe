import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonCache } from 'src/app/models/personCache.model';
import { WorkCache } from 'src/app/models/workcache.model';
import { KnoraService } from '../../services/knora.service';

@Component({
  selector: 'tds-auteurspage',
  templateUrl: './auteurspage.component.html',
  styleUrls: ['./auteurspage.component.scss']
})
export class AuteurspageComponent implements OnInit {
  @Input() authors: PersonCache[];
  @Input() reset: Subject<number>;
  count: number;

  allWorks: WorkCache[];

  page = 0;
  pageMax = 0;

  panel = new Map<string, boolean>();

  pageLength = 25;

  constructor(private knoraService: KnoraService) { }

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

  getWorksByAuthorId(authorId: string) {
    return this.allWorks.filter(work => ((work.authorIds != null) && work.authorIds.indexOf(authorId) >= 0));
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
