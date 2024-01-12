import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { Representation } from 'src/app/models/representation.model';
import { Work } from 'src/app/models/work.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-representations-list',
  templateUrl: './representations-list.component.html',
  styleUrls: ['./representations-list.component.scss'],
})
export class RepresentationsListComponent implements OnInit {
  @Input() source: string;
  @Input() type: string;
  @Input() header: boolean;
  @Input() titles: boolean;
  panel: Map<string, boolean> = new Map<string, boolean>();
  representations: Observable<Representation[]>;
  works: Map<string, Observable<Work>> = new Map<string, Observable<Work>>();
  places: Map<string, Observable<Place>> = new Map<string, Observable<Place>>();

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    const us = this;

    const _tap = tap( (representations: Representation[]) => {
      representations.map( (representation: Representation) => {
        // get the representations' work
        us.works[representation.work] = us.knoraService.getWork(representation.work);
        // get the representation's place
        us.places[representation.place] = us.knoraService.getPlace(representation.place);
      });
    });

    const _finalise: MonoTypeOperatorFunction<Representation[]> = finalize(() => {
      us.loading.next(false);
    });

    if (this.type === 'year') {
      this.representations = this.knoraService.getRepresentationsByYear(+this.source).pipe(_tap, _finalise);

    } else {
      this.representations = this.knoraService.getRepresentationsByLink(this.source, this.type).pipe(_tap, _finalise);
    }

  }

}
