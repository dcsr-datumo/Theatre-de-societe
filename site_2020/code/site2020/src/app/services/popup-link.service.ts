import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { DomUtil, LeafletMouseEvent, Marker } from 'leaflet';
import { PopupLinkComponent } from '../components/popup-link/popup-link.component';

@Injectable({
  providedIn: 'root'
})
export class PopupLinkService {

  constructor(private cfr: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) { }

  register(marker: Marker, link: string, text: string): void  {
    // marker.on('click');
    // marker.on(click, ($event: MouseEvent)  => this.popup($event.target, link) );
    // marker.addEventListener('click', () => {console.log("strange "+ marker.getTooltip())});
    marker.on('click', (event: LeafletMouseEvent) => this.popup(event.target, link, text));
  }

  popup(marker: Marker, link: string, text: string) {
    const cmpFactory = this.cfr.resolveComponentFactory(PopupLinkComponent);
    const componentRef = cmpFactory.create(this.injector);
    componentRef.instance.link = link;
    componentRef.instance.text = text;
    this.appRef.attachView(componentRef.hostView);
    const markerElement = marker.getElement();
    markerElement.parentElement.appendChild(componentRef.location.nativeElement);

    const markerPos = DomUtil.getPosition(markerElement);
    const markerClass = DomUtil.getClass(markerElement);


    DomUtil.setTransform(componentRef.location.nativeElement, markerPos);
    DomUtil.setClass(componentRef.location.nativeElement, markerClass);
  }
}
