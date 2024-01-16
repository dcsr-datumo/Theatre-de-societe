import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  title = 'Théâtres de société';
  menu = {
    'représentations': [
      'carte', 'calendrier', 'auteurs', 'pièces'
    ],
    'à propos': [
      'projet', 'equipe', 'agenda', 'publications', 'biblio', 'partenaires', 'contact'
    ]
  };
  selectedMenuItem = 'à propos';
  selectedMenuSubItem = 'projet';
  secondaryTitle = 'Catalogue des représentations données en société en France et en Suisse Romande entre 1700 et 1871';

  // urlPre = '/Theatre-de-societe';
  urlPre = environment.urlPre;
}
