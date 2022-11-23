import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Quote } from 'src/app/models/quote.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  iri: string;

  quote: Quote;

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    let us = this;

    let id = this.route.snapshot.paramMap.get('id');
    this.iri = `http://rdfh.ch/0103/${id}`;
    this.knoraService.getQuote(this.iri).subscribe(
      /* next: */ (quote: Quote) => {this.quote = quote;},
      /* err : */ (error) => { console.log(error) },
      /* end : */ () => { us.loading.next(false); }
    );
  }
}
