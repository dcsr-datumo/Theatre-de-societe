import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KnoraService } from "../../services/knora.service";

import { Quote } from "../../models/quote.model";

@Component({
  selector: 'tds-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  @Input()
  iri: string;

  quote: Observable<Quote>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.quote = this.knoraService.getQuote(this.iri);
  }

}
