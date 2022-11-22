import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
//import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjetComponent } from './components/projet/projet.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { BiblioComponent } from './components/biblio/biblio.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { ContactComponent } from './components/contact/contact.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { RepresentationLineComponent } from './components/representation-line/representation-line.component';
import { WorkComponent } from './components/work/work.component';
import { PlaceComponent } from './components/place/place.component';
import { RoleComponent } from './components/role/role.component';
import { FestivalComponent } from './components/festival/festival.component';
import { RepresentationComponent } from './components/representation/representation.component';
import { GenreComponent } from './components/genre/genre.component';
import { YearComponent } from './components/year/year.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
//import { LeafletMarkerClusterOptions } from '@asymmetrik/ngx-leaflet-markercluster';
import { AuteursComponent } from './components/auteurs/auteurs.component';
import { PiecesComponent } from './components/pieces/pieces.component';
import { NoAccentPipe } from './pipes/no-accent.pipe';
import { WorkLineComponent } from './components/work-line/work-line.component';
import { FilterWorkTitlePipe } from './pipes/filter-work-title.pipe';
import { FormsModule } from '@angular/forms';
import { PersonLineComponent } from './components/person-line/person-line.component';
import { GroupLineComponent } from './components/group-line/group-line.component';
import { MembershipLineComponent } from './components/membership-line/membership-line.component';
import { PlaceLineComponent } from './components/place-line/place-line.component';
import { ConvertStandofPipe } from './pipes/convert-standof.pipe';
import { RepresentationsListComponent } from './components/representations-list/representations-list.component';
import { PopupLinkComponent } from './components/popup-link/popup-link.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuteurspageComponent } from './components/auteurspage/auteurspage.component';
import { PiecespageComponent } from './components/piecespage/piecespage.component';
import { RepresentationsListMapComponent } from './components/representations-list-map/representations-list-map.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QuoteComponent } from './components/quote/quote.component';
import { QuoteContentComponent } from './components/quote-content/quote-content.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent,
    CalendarComponent, CalendarPageComponent,
    RepresentationLineComponent,
    WorkComponent, PlaceComponent, RoleComponent, FestivalComponent,
    GenreComponent,
    ProjetComponent, AgendaComponent, PublicationsComponent, BiblioComponent, PartenairesComponent, ContactComponent, EquipeComponent, RepresentationComponent, YearComponent, MapComponent, AuteursComponent, NoAccentPipe,
    PiecesComponent, WorkLineComponent, FilterWorkTitlePipe, PersonLineComponent, GroupLineComponent, MembershipLineComponent, PlaceLineComponent, ConvertStandofPipe, RepresentationsListComponent, PopupLinkComponent, PlaceDetailsComponent, AuteurspageComponent, PiecespageComponent, RepresentationsListMapComponent,
    QuoteComponent, QuoteContentComponent, QuoteListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, LayoutModule,
    MatToolbarModule, MatTooltipModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule, MatCardModule, MatProgressBarModule,
    //MatDialog,
    MatExpansionModule, MatMenuModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    FormsModule,
    PdfViewerModule,
    ClipboardModule,
    NgxSliderModule
  ],
  providers: [ConvertStandofPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
