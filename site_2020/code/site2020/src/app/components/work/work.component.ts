import { Component, OnInit, Input } from '@angular/core';
import { KnoraService } from '../../services/knora.service';
import { Observable, config } from 'rxjs';
import { Work } from 'src/app/models/work.model';

@Component({
  selector: 'tds-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  @Input() iri: string;
  work: Observable<Work>;

  constructor(
    private knoraService: KnoraService,
  ) { }

  ngOnInit(): void {
    this.work = this.knoraService.getWork(this.iri);
  }

}
