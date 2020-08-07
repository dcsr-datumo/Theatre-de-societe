import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'tds-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
  site: SiteService;
  panelOpenState: boolean;

  constructor(private siteService: SiteService) {
    this.site = siteService;
   }

  ngOnInit(): void {
  }

}
