import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';
// à propos
import { ProjetComponent } from './components/projet/projet.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { BiblioComponent } from './components/biblio/biblio.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { ContactComponent } from './components/contact/contact.component';
import { RepresentationComponent } from './components/representation/representation.component';
import { MapComponent } from './components/map/map.component';
import { AuteursComponent } from './components/auteurs/auteurs.component';
import { PiecesComponent } from './components/pieces/pieces.component';
import { PlaceComponent } from './components/place/place.component';

const routes: Routes = [
  { path: 'calendrier', component: CalendarComponent },
  { path: 'year/:year', component: CalendarPageComponent },
  { path: 'representation/:id', component: RepresentationComponent },
  { path: 'carte', component: MapComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'biblio', component: BiblioComponent },
  { path: 'partenaires', component: PartenairesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'auteurs', component: AuteursComponent },
  { path: 'pieces', component: PiecesComponent },
  { path: 'place/:place', component: PlaceComponent },
  { path: '',   redirectTo: '/projet', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
