import { Component, Input, OnInit } from '@angular/core';
import { ApiResponseError, CountQueryResponse } from '@dasch-swiss/dsp-js';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PersonMatchAuthor } from 'src/app/models/personmatchauthor.model';

import { KnoraService } from "../../services/knora.service";

@Component({
  selector: 'tds-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.scss']
})
export class AuteursComponent implements OnInit {
  allAuthors: PersonMatchAuthor[];
  authors: Observable<PersonMatchAuthor[]>;
  authorsCount: Observable<string>;
  loading: Observable<boolean>;
  panel: Map<string, boolean> = new Map<string, boolean>();
  @Input()
  searchText: string = "";
  private searchTerms = new Subject<string>();


  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    // get the count
    this.knoraService.getAuthorsCount().subscribe(
      (response: CountQueryResponse) => {
        this.authorsCount = of(response.numberOfResults.toString());
      },
      (error: ApiResponseError) => {
        this.authorsCount = of('unknown');
        console.error(error);
      }
    );

    // get the list of authors
    let us = this;

    function readPage(observer) {
      us.loading = of(true);

      us.knoraService.getAuthors().subscribe(
        data => {
          observer.next(data);
          us.allAuthors = data;
        },
        error => console.log(error),
        () => {
          us.loading = of(false);
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
              let matches = us.allAuthors.filter(author =>
                  {
                    return (
                      (author.label && author.label.toLowerCase().includes(term))
                      ||
                      (author.familyName && author.familyName.toLowerCase().includes(term))
                      ||
                      (author.givenName && author.givenName.toLowerCase().includes(term))
                      ||
                      (author.pseudonym && author.pseudonym.toLowerCase().includes(term))
                    );
                  }
                );
              observer.next(matches);
            }
          );
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
