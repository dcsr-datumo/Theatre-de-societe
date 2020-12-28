import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, marker, Marker, LatLng, LatLngExpression, icon } from 'leaflet';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceMatch } from 'src/app/models/placematch.model';
import { KnoraService } from 'src/app/services/knora.service';

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
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(geomap: Map) {
    this.map = geomap;
    this.map$.emit(geomap);
    //let this_icon = icon({iconUrl: '/assets/img/marker-icon.png', shadowUrl: '/assets/img/marker-shadow.png'});
    let this_icon = icon({iconUrl: '/assets/img/marker-icon.png'});

    let tv = this.knoraService.getPlaces().pipe(
      map(
        (matches: PlaceMatch[]) => matches.filter(
          (place: PlaceMatch) => {
            return !(place.latLong.length == 0 || isNaN(place.latLong[0]));
          }
        ).map(
          (place: PlaceMatch) => {
            return marker(
              [place.latLong[0], place.latLong[1]],
              {icon: this_icon}
            ).bindTooltip(
              place.name,
              {
                permanent: false,
                opacity: 1,
                direction: 'top'
              }
            )
            //.on('click', () => { this.router.navigate(['calendrier']) } )
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
