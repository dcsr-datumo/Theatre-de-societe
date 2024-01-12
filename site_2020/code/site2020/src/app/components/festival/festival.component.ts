import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from 'src/app/models/festival.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.scss']
})
export class FestivalComponent implements OnInit {
  @Input() iri: string;

  festival: Observable<Festival>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.festival = this.knoraService.getFestival(this.iri);
  }

}
