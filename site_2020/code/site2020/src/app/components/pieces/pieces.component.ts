import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';

import { KnoraService } from 'src/app/services/knora.service';
import { Work } from 'src/app/models/work.model';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { WorkMatch } from 'src/app/models/workmatch.model';
import { ApiResponseError, CountQueryResponse } from '@dasch-swiss/dsp-js';

@Component({
  selector: 'tds-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {
  id: string;
  allWorks: WorkMatch[];
  works: Observable<WorkMatch[]>;
  worksCount: Observable<string>;
  loading: Observable<boolean>;
  counter: Observable<number>;
  panel: Map<string, boolean> = new Map<string, boolean>();
  @Input()
  searchText: string = "";

  private searchTerms = new Subject<string>();

  constructor(
    //private route: ActivatedRoute,
    private knoraService: KnoraService,
    //private location: Location
  ) { }

  ngOnInit(): void {
    // get the count
    this.knoraService.getWorksCount().subscribe(
      (response: CountQueryResponse) => {
        this.worksCount = of(response.numberOfResults.toString());
      },
      (error: ApiResponseError) => {
        this.worksCount = of('unknown');
        console.error(error);
      }
    );

    let us = this;

    function readPage(observer) {
      us.loading = of(true);
      us.counter = of(0);
      // read pages on first load
      us.knoraService.getWorks().subscribe(
        data => {
          observer.next(data);
          us.allWorks = data;
          us.counter = of(data.length);
        },
        error => console.log(error),
        () => {
          console.log("initial request is over");
          us.loading = of(false);

          // then answer the searches
          us.searchTerms.pipe(
            // temporise, don't over react
            debounceTime(100),
            // go to next stage only if needed
            distinctUntilChanged()
          ).subscribe(
            term => {
              console.log("search works: "+ term);
              if (!term.trim()) {
                // if not search term, return the complete set of works
                observer.next(us.allWorks);
                us.counter = of(us.allWorks.length);
              }
              term = term.toLowerCase();
              let matches = us.allWorks.filter(work =>
                  {
                    return (
                      (work.label && work.label.toLowerCase().includes(term))
                      ||
                      (work.title && work.title.toLowerCase().includes(term))
                    );
                  }
                );
              observer.next(matches);
              us.counter = of(matches.length);
            }
          );
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
