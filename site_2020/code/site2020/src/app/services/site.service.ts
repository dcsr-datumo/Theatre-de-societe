import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  title = 'Théâtres de société';
  menu = {
    'représentations': [
      'calendrier', 'carte', 'recherche'
    ],
    'à propos': [
      'projet', 'equipe', 'agenda', 'biblio', 'partenaires', 'contact'
    ]
  };
  selectedMenuItem = 'à propos';
  selectedMenuSubItem = 'projet';
  secondaryTitle = 'Catalogue des représentations données en société en France et en Suisse Romande entre 1700 et 1871';

  constructor() { }
}
