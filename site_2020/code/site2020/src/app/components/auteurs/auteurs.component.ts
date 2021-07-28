import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';
import { PersonCache } from 'src/app/models/personCache.model';

import { KnoraService } from "../../services/knora.service";

@Component({
  selector: 'tds-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.scss']
})
export class AuteursComponent implements OnInit {
  allAuthors: PersonCache[];
  authors: Observable<PersonCache[]>;
  authorsCount: Subject<number> = new Subject<number>();
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input()
  searchText: string = "";
  private searchTerms = new Subject<string>();

  reset: Subject<number> = new Subject<number>();


  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.reset.next(0);

    // get the list of authors
    let us = this;

    function readMatches(observer) {
      // initial load
      // get the list of authors
      us.knoraService.getAuthorsQuickCache().subscribe(
        (data: PersonCache[]) => {
          // send them to the observer
          us.allAuthors = data;
          observer.next(data);
          us.authorsCount.next(us.allAuthors.length);
        },
        (error) => { console.log(error) },
        () => {
          us.reset.next(us.allAuthors.length);
          us.loading.next(false);
          console.log("passed initial value")

          // then start listening to the search box entry
          us.searchTerms.pipe(
            // temporise, don't over react
            debounceTime(100),
            // go to next stage only if needed
            distinctUntilChanged()
          ).subscribe(
            term => {
              us.loading.next(true);
              delay(2000);
              if (!term.trim()) {
                // if not search term, return the complete set of works
                observer.next(us.allAuthors);
                us.reset.next(us.allAuthors.length);
                us.loading.next(false);
                return;
              }

              term = term.toLowerCase();
              // search for the matches
              let matches = us.allAuthors.filter(author =>
                {
                  return (
                    (author.familyName && author.familyName.toLowerCase().includes(term))
                    ||
                    (author.givenName && author.givenName.toLowerCase().includes(term))
                    ||
                    (author.pseudonym && author.pseudonym.toLowerCase().includes(term))
                  );
                }
              );
              // sends the matches
              observer.next(matches);
              us.reset.next(matches.length);
              us.loading.next(false);
            }
          )
        }
      )
    };
    this.authors = new Observable(readMatches);
  }

  // called by the template when a text is entered
  search(term: string): void {
    console.log("search adding: "+ term);
    this.searchTerms.next(term);
  }
}
