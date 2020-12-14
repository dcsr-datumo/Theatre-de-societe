import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';

import { KnoraService } from 'src/app/services/knora.service';
import { Work } from 'src/app/models/work.model';

@Component({
  selector: 'tds-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {
  id: string;
  works: Observable<Work[]>;

  constructor(
    //private route: ActivatedRoute,
    private knoraService: KnoraService,
    //private location: Location
  ) { }

  ngOnInit(): void {
    //this.id = this.route.snapshot.paramMap.get('id');
    this.works = this.knoraService.getWorks();
  }

}
