import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';

import { KnoraService } from "../../services/knora.service";

@Component({
  selector: 'tds-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.scss']
})
export class AuteursComponent implements OnInit {
  authors: Observable<Person[]>;
  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.authors = this.knoraService.getAuthors();
  }

}
