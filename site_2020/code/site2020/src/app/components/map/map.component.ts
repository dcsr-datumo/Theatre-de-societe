import { Component, OnInit, Input, Output, EventEmitter, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, marker, Marker, LatLng, LatLngExpression, icon, popup } from 'leaflet';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { PlaceMatch } from 'src/app/models/placematch.model';
import { PlaceCache } from 'src/app/models/placecache.model';
import { KnoraService } from 'src/app/services/knora.service';
import { PopupLinkService } from 'src/app/services/popup-link.service';

@Component({
  selector: 'tds-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Input() layers = [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  ];
  @Input() options: MapOptions= {
    layers: this.layers,
    zoom:5,
    center:latLng(47,0)
  };

  loading: Observable<boolean>;

  public map: Map;

  places: PlaceMatch[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private knoraService: KnoraService,
    private popupLinkService: PopupLinkService,
    public ngZone : NgZone,
    public elementRef : ElementRef
  ) {
   }

  ngOnInit(): void {
    this.loading = of(true);
    let layers: [Layer];
    layers = [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ];

  }

  ngOnDestroy() {
    // TODO: note loic: find out the source of the exception
    // for now: sweeping them under the carpet
    try {
      this.map.clearAllEventListeners();
      this.map.off();
      this.map.remove();
    } catch(error) {
      console.log(error);
    }
  };

  toLatLong(place: PlaceCache) : number[] {
      return place.coord?.split(",")?.map(parseFloat);
  }

  onMapReady(geomap: Map) {
    this.map = geomap;
    this.map$.emit(geomap);
    //let this_icon = icon({iconUrl: '/assets/img/marker-icon.png', shadowUrl: '/assets/img/marker-shadow.png'});
    let this_icon = icon({iconUrl: '/assets/img/marker-icon.png'});

    let tv = this.knoraService.getPlacesQuickCache().pipe(
      map(
        (matches: PlaceCache[]) => matches.filter(
          (place: PlaceCache) => {
            //console.log("latlong: "+ place.coord +" -- "+ place.latLong);
            let latLong = this.toLatLong(place);
            return (latLong && latLong.length == 2 && !isNaN(latLong[0]));
          }
        ).map(
          (place: PlaceCache) => {
            let latLong = this.toLatLong(place);
            let m = marker(
              [latLong[0], latLong[1]],
              {icon: this_icon}
            );

            m.bindTooltip(
              // adding '...' to tell that there is a pop-up content
              place.name + (place.notice?" ...":""),
              {
                permanent: false,
                opacity: 1,
                direction: 'top'
              }
            );

            // links get outside of angular realm, loosing cache
            // m.bindPopup(
            //   // could be an angular component
            //   // or a call to a service that a component is listening to
            //   // missing the incoming links (groups and representations)
            //   `<a href=/place/${place.ref}>${place.name}</a>
            //   <div style="overflow: auto; max-height: 30em">${place.notice}</div>
            //   `
            // )

            // cheating: opening in a different window
            // m.bindPopup(
            //   `<a href=/place/${place.ref} target="_blank">${place.name}</a>
            //   <div style="overflow: auto; max-height: 30em">${place.notice}</div>
            //   `
            // )

            // I didn't manage to make it work
            // ref: https://stackoverflow.com/questions/43460579/angular-2-leaflet-map-how-to-link-to-a-component-from-marker-popup-rout
            //this.popupLinkService.register(m, place.ref, place.name);

            m.on('click' , () => {
              this.ngZone.run(() => {
                console.log("map to placeDetail: " + place.id + " : "+ place.name);
                this.knoraService.placeDetails.next(place.id);
              });

            });

            return m;
          }
        )
      )
    ).subscribe(
      (places: Marker[]) => {
        places.forEach((place: Marker) => geomap.addLayer(place));
      },
      error => console.log(error),
      () => {
        this.loading = of(false);
      }
    );
  }
}
