import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'tds-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {
  site: SiteService;
  Object = Object;

  partners = {
    fns: { img: 'fns.png', name: 'Fonds national suisse pour la recherche' },
    unil: { img: 'unilogo_bleu.svg', name: 'UNIL' },
    ceredi: { img: 'ceredi.png', name: 'Ceredi' },
    lis: { img: 'lis.png', name: 'LIS' },
    crimel: { img: 'crimel.png', name: 'Crimel' },
    dasch: { img: 'DaSCH_Logo_full_name_coloured.png', name: 'DaSCH' },
    DCSR: { img: 'dcsr_unilogo_bleu.svg', name: 'DCSR' }
  };

  constructor(private siteService: SiteService) {
    this.site = siteService;
  }

  ngOnInit(): void {
  }

}
