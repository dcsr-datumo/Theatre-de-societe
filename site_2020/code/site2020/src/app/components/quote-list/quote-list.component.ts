import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  @Input()
  quotes_iri: [string];

  quotes = new Array<Quote>();

  panel: Map<string, boolean> = new Map<string, boolean>();


  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    let us = this;
    // we get all of the resources, even the deleted ones :(
    // so we have to subscribe to them all to filter out the deleted ones
    this.quotes_iri.forEach((iri: string) => {
      this.knoraService.getQuote(iri).subscribe((quote: Quote) => {
        // i did not find an accessible member "isDeleted" !
        if(!(quote.label === "Deleted Resource")) {
          us.quotes.push(quote);
          us.panel[quote.id] = false;
        }
      });
    });
  }

}
