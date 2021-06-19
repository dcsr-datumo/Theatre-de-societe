import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-person-line',
  templateUrl: './person-line.component.html',
  styleUrls: ['./person-line.component.scss']
})
export class PersonLineComponent implements OnInit {
  @Input() iri : string;
  person: Observable<Person>;

  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.person = this.knoraService.getPerson(this.iri);
  }

}
