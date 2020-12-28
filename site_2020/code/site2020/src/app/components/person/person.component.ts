import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() iri : string;
  person: Observable<Person>;

  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.person = this.knoraService.getPerson(this.iri);
  }

}
