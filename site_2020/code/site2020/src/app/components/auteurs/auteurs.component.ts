import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author.model';

import { KnoraService } from "../../services/knora.service";

@Component({
  selector: 'tds-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.scss']
})
export class AuteursComponent implements OnInit {
  authors: Observable<Author[]>;
  constructor(
    private knoraService: KnoraService
  ) { }

  ngOnInit(): void {
    this.authors = this.knoraService.getAuthors();
  }

}
