import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'tds-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.scss']
})
export class BiblioComponent implements OnInit {
  site: SiteService;

  fileToDownload = "http://localhost:4200/assets/doc/Biblio_TheatresDeSociete.pdf";

  constructor(private siteService: SiteService, private httpClient: HttpClient) {
    this.site = siteService;
  }

  ngOnInit(): void {
  }

  // download(filters: any) {
  //   console.log("download called...");
  //   const httpOptions: Object = {
  //     responseType: 'blob'
  //   };
  //   return this.httpClient.post<HttpResponse<Blob>>(filters, filters, httpOptions)
  // }

}
