import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';

const routes: Routes = [
  { path: "calendar", component: CalendarComponent },
  { path: "year/:year", component: CalendarPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
