import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KnoraService } from "../../services/knora.service";

import { Quote } from "../../models/quote.model";

@Component({
  selector: 'tds-quote-line',
  templateUrl: './quote-line.component.html',
  styleUrls: ['./quote-line.component.scss']
})
export class QuoteLineComponent implements OnInit {
  @Input()
  iri: string;

  quote: Observable<Quote>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.quote = this.knoraService.getQuote(this.iri);
  }

}
