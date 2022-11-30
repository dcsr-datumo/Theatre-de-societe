import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, config, BehaviorSubject } from 'rxjs';

import { KnoraService } from '../../services/knora.service';
import { Representation } from '../../models/representation.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'tds-representation',
  templateUrl: './representation.component.html',
  styleUrls: ['./representation.component.scss']
})
export class RepresentationComponent implements OnInit {
  id: string;
  representation: Observable<Representation>;

  panel: Map<string, boolean> = new Map<string, boolean>();

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private knoraService: KnoraService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const us = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.representation = this.knoraService.getRepresentation(`http://rdfh.ch/0103/${this.id}`).pipe(finalize(() => {
      us.loading.next(false);
    }));
  }

}
