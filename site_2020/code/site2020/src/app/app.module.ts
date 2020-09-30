import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
//import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjetComponent } from './components/projet/projet.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { BiblioComponent } from './components/biblio/biblio.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { ContactComponent } from './components/contact/contact.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { RepresentationLineComponent } from './components/representation-line/representation-line.component';
import { WorkComponent } from './components/work/work.component';
import { PlaceComponent } from './components/place/place.component';
import { QuoteComponent } from './components/quote/quote.component';
import { RoleComponent } from './components/role/role.component';
import { FestivalComponent } from './components/festival/festival.component';
import { RepresentationComponent } from './components/representation/representation.component';
import { GenreComponent } from './components/genre/genre.component';
import { YearComponent } from './components/year/year.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent,
    CalendarComponent, CalendarPageComponent,
    RepresentationLineComponent,
    WorkComponent, PlaceComponent, QuoteComponent, RoleComponent, FestivalComponent,
    GenreComponent,
    ProjetComponent, AgendaComponent, BiblioComponent, PartenairesComponent, ContactComponent, EquipeComponent, RepresentationComponent, YearComponent, MapComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, LayoutModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule, MatCardModule,
    //MatDialog,
    MatExpansionModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
