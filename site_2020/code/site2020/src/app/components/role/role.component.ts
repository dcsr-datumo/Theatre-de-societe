import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { KnoraService } from 'src/app/services/knora.service';

@Component({
  selector: 'tds-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @Input() iri: string;

  role: Observable<Role>;

  constructor(private knoraService: KnoraService) { }

  ngOnInit(): void {
    this.role = this.knoraService.getRole(this.iri);
  }

}
