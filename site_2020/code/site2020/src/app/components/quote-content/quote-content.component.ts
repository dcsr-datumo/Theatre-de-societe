import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KnoraService } from '../../services/knora.service';

import { Quote } from '../../models/quote.model';

@Component({
  selector: 'tds-quote-content',
  templateUrl: './quote-content.component.html',
  styleUrls: ['./quote-content.component.scss']
})
export class QuoteContentComponent implements OnInit {
  @Input()
  quote: Quote;
  @Input()
  embedded: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
