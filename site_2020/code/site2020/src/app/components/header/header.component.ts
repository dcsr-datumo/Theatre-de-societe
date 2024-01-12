import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'tds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  site: SiteService;
  Object = Object;
  hide = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private siteService: SiteService, private breakpointObserver: BreakpointObserver) {
    this.site = siteService;
  }

}
