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

@NgModule({
  declarations: [
    AppComponent, HeaderComponent,
    CalendarComponent, CalendarPageComponent,
    ProjetComponent, AgendaComponent, BiblioComponent, PartenairesComponent, ContactComponent, EquipeComponent],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, LayoutModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule, MatCardModule,
    //MatDialog,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
