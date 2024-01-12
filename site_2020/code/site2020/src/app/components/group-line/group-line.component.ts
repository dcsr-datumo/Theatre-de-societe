import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-group-line',
  templateUrl: './group-line.component.html',
  styleUrls: ['./group-line.component.scss']
})
export class GroupLineComponent implements OnInit {
  @Input() iri: string;
  group: Observable<Group>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.group = this.knoraService.getGroup(this.iri);
  }

}
