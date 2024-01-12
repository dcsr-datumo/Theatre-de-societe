import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'tds-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  site: SiteService;

  constructor(private siteService: SiteService) {
    this.site = siteService;
  }

  ngOnInit(): void { }

}
