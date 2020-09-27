import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  @Input()
  iri: string;

  genre: Observable<Genre>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.genre = this.knoraService.getGenre(this.iri);
  }

}
