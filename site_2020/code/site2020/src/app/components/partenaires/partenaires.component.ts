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
    unil: { img: 'unil.png', name: 'Université de Lausanne' },
    ladhul: { img: 'ladhul.png', name: 'Labo. d\'humanités digitales de l\'Unil' },
    ceredi: { img: 'ceredi.png', name: 'Ceredi' },
    lis: { img: 'lis.png', name: 'LIS' },
    crimel: { img: 'crimel.png', name: 'Crimel' },
    platec: { img: 'platec_logo.png', name: 'PlaTec' },
    dasch: { img: 'DaSCH-logo.png', name: 'DaSCH' }
  };

  constructor(private siteService: SiteService) {
    this.site = siteService;
  }

  ngOnInit(): void {
  }

}
