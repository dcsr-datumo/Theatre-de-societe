import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'tds-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  site: SiteService;

  constructor(private siteService: SiteService) {
    this.site = siteService;
  }

  ngOnInit(): void {
  }

}
