import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { KnoraService } from 'src/app/services/knora.service';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { WorkCache } from 'src/app/models/workcache.model';

@Component({
  selector: 'tds-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {
  allWorks: WorkCache[];
  works: Observable<WorkCache[]>;
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  counter: Observable<number>;
  @Input()
  searchText = '';

  private searchTerms = new Subject<string>();

  reset = new Subject<number>();

  constructor(
    private knoraService: KnoraService,
  ) { }

  ngOnInit(): void {
    this.reset.next(0);

    const us = this;

    function readPage(observer) {
      // read pages on first load
      us.knoraService.getWorksQuickCache().subscribe(
        (data: WorkCache[]) => {
          // send them to the observer
          us.allWorks = data;
          observer.next(data);
        },
        (error) => { console.log(error); },
        () => {
          us.reset.next(us.allWorks.length);
          us.loading.next(false);

          // then answer the searches
          us.searchTerms.pipe(
            // temporise, don't over react
            debounceTime(100),
            // go to next stage only if needed
            distinctUntilChanged()
          ).subscribe(
            term => {
              us.loading.next(true);
              if (!term.trim()) {
                // if not search term, return the complete set of works
                observer.next(us.allWorks);
                us.reset.next(us.allWorks.length);
                us.loading.next(false);
                return;
              }

              term = term.toLowerCase();
              const matches = us.allWorks.filter(work =>
                {
                  return (
                    (work.title && work.title.toLowerCase().includes(term))
                    ||
                    (work.name && work.name.toLowerCase().includes(term))
                  );
                }
              );
              observer.next(matches);
              us.reset.next(matches.length);
              us.loading.next(false);
            }
          );
        }
      );
    }
    this.works = new Observable(readPage);
  }

  // called by the template when a text is entered
  search(term: string): void {
    this.searchTerms.next(term);
  }

}
