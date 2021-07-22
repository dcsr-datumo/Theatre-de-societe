import { Component, Input, OnInit } from '@angular/core';
import { ApiResponseError, CountQueryResponse } from '@dasch-swiss/dsp-js';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PersonCache } from 'src/app/models/personCache.model';
import { PersonMatchAuthor } from 'src/app/models/personmatchauthor.model';

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
  loading: Subject<boolean> = new Subject<boolean>();
  panel: Map<string, boolean> = new Map<string, boolean>();
  @Input()
  searchText: string = "";
  private searchTerms = new Subject<string>();


  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.loading.next(true);

    // get the list of authors
    let us = this;

    function readPage(observer) {
      // initial load
      // get the list of authors
      us.allAuthors = us.knoraService.getAuthorsQuickCache();
      // send them to the observer
      observer.next(us.allAuthors);
      us.authorsCount.next(us.allAuthors.length);
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
          if (!term.trim()) {
            // if not search term, return the complete set of works
            observer.next(us.allAuthors);
            //us.counter = of(us.allAuthors.length);
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
        }
      );
    }
    this.authors = new Observable(readPage);
  }

  // called by the template when a text is entered
  search(term: string): void {
    console.log("search adding: "+ term);
    this.searchTerms.next(term);
  }

}
