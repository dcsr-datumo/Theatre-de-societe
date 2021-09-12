import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, config } from "rxjs";

import { KnoraService } from "../../services/knora.service";
import { Representation } from '../../models/representation.model';

@Component({
  selector: 'tds-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss']
})
export class RepresentationComponent implements OnInit {
  id: string;
  representation: Observable<Representation>;

  panel: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.representation = this.knoraService.getRepresentation(`http://rdfh.ch/0103/${this.id}`);
  }

}
