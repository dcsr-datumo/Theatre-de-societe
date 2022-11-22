import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.iri = `http://rdfh.ch/0103/${id}`;
    this.knoraService.getQuote(this.iri).subscribe((quote: Quote) => {this.quote = quote;});
  }
}
