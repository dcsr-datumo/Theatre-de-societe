import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';

import { KnoraService } from 'src/app/services/knora.service';
import { Work } from 'src/app/models/work.model';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { WorkMatch } from 'src/app/models/workmatch.model';
import { ApiResponseError, CountQueryResponse } from '@dasch-swiss/dsp-js';
import { WorkCache } from 'src/app/models/workcache.model';

@Component({
  selector: 'tds-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {
  allWorks: WorkCache[];
  works: Observable<WorkCache[]>;
  worksCount: Subject<number> = new Subject<number>();
  loading: Subject<boolean> = new Subject<boolean>();
  counter: Observable<number>;
  panel: Map<string, boolean> = new Map<string, boolean>();
  @Input()
  searchText: string = "";

  private searchTerms = new Subject<string>();

  constructor(
    private knoraService: KnoraService,
  ) { }

  ngOnInit(): void {
    this.loading.next(true);

    let us = this;

    function readPage(observer) {
      // read pages on first load
      us.allWorks = us.knoraService.getWorksQuickCache();
      observer.next(us.allWorks);
      us.loading.next(false);

      // then answer the searches
      us.searchTerms.pipe(
        // temporise, don't over react
        debounceTime(100),
        // go to next stage only if needed
        distinctUntilChanged()
      ).subscribe(
        term => {
          if (!term.trim()) {
            // if not search term, return the complete set of works
            observer.next(us.allWorks);
            us.worksCount.next(us.allWorks.length);
            return;
          }
          term = term.toLowerCase();
          let matches = us.allWorks.filter(work =>
            {
              return (
                (work.title && work.title.toLowerCase().includes(term))
                  ||
                (work.name && work.name.toLowerCase().includes(term))
              );
            }
          );
          observer.next(matches);
          us.worksCount.next(matches.length);
        }
      );
    }
    this.works = new Observable(readPage);
  }

  // called by the template when a text is entered
  search(term: string): void {
    console.log("search adding: "+ term);
    this.searchTerms.next(term);
  }

}
