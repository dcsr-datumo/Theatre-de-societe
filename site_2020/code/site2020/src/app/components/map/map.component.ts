import { Component, OnInit, Input, Output, EventEmitter, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, marker, Marker, LatLng, LatLngExpression, icon, popup, MarkerClusterGroup } from 'leaflet';
import { Map as LeafletMap } from 'leaflet';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { PlaceMatch } from 'src/app/models/placematch.model';
import { PlaceCache } from 'src/app/models/placecache.model';
import { KnoraService } from 'src/app/services/knora.service';
import { PopupLinkService } from 'src/app/services/popup-link.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'tds-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() map$: EventEmitter<LeafletMap> = new EventEmitter;
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

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  markerClusterGroup: MarkerClusterGroup;
  markerClusterOptions = {removeOutsideVisibleBounds: true};
  markerClusterData = [];

  public map: LeafletMap;

  places: PlaceCache[] = [];
  placesToLayers = new Map<string, Layer>();

  yearMin = 1700;
  yearMax = 1900;
  valueMin = this.yearMin;
  valueMax = this.yearMax;
  sliderOptions: Options = {
    floor: this.valueMin,
    ceil: this.valueMax,
    step: 10,
    showTicks: true
  };

  private searchTerms = "";
  private searchTermsDate = new BehaviorSubject<string>(this.searchTerms +","+ this.valueMin+","+this.valueMax);

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
    this.loading.next(true);

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

  onMapReady(geomap: LeafletMap) {
    let us = this;
    this.map = geomap;
    this.map$.emit(geomap);
  }

  afterMarkerClusterReady(geomap: LeafletMap, us: MapComponent) {
    // then start listening to the search box entry
    us.searchTermsDate.pipe(
      // temporise, don't over react
      debounceTime(100),
      // go to next stage only if needed
      distinctUntilChanged()
    ).subscribe(
      termDate => {
        us.loading.next(true);
        let [term, valmin, valmax] = termDate.split(',');
        // if (!term.trim()) {
        //   // if not search term, return the complete set of places
        //   console.log("all pl aces");
        //   for (const m of us.placesToLayers.values()) {
        //     // note loic: not very elegant, should keep a list of removed places?
        //     us.markerClusterGroup.removeLayer(m);
        //     us.markerClusterGroup.addLayer(m);
        //   }
        //   us.loading.next(false);
        //   return;
        // }

        term = term.toLowerCase();
        // search for the matches
        us.places.forEach(place => {
          let m = us.placesToLayers.get(place.id);
          if (m) {
            us.markerClusterGroup.removeLayer(m);
            if (
              (!term.trim() || (place.name && place.name.toLowerCase().includes(term)))
              &&
              (valmin == this.yearMin.toString() || (place.maxDate && place.maxDate >= valmin))
              &&
              (valmax > (this.yearMax-10).toString() || (place.minDate && place.minDate <= valmax))
            ) {
              us.markerClusterGroup.addLayer(m);
            }
          } else {
            console.log("not found: "+ place.id)
          }
        }
        );
        us.loading.next(false);
      }
    )

  }

  markerClusterReady(markerCluster: MarkerClusterGroup) {
    let us = this;
    this.markerClusterGroup = markerCluster;

    //let this_icon = icon({iconUrl: '/assets/img/marker-icon.png', shadowUrl: '/assets/img/marker-shadow.png'});
    let this_icon = icon({iconUrl: '/assets/img/marker-icon.png'});

    this.knoraService.getPlacesQuickCache().pipe(
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
              place.name + (place.notices?" ...":""),
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
                // console.log("map to placeDetail: " + place.id + " : "+ place.name);
                this.knoraService.placeDetails.next(place.id);
              });

            });

            this.places.push(place);
            this.placesToLayers.set(place.id, m);
            return m;
          }
        )
      )
    ).subscribe(
      (places: Marker[]) => {
        places.forEach((place: Marker) => markerCluster.addLayer(place));
      },
      error => console.log(error),
      () => {
        this.loading.next(false);
        this.afterMarkerClusterReady(us.map, us);
      }
    );

  }

  onTimeRangeHighValueChange(event) {
    // console.log("high value: "+ event +", valueMin: "+ this.valueMin +", valueMax: "+ this.valueMax)
    this.searchTermsDate.next(this.searchTerms +","+ this.valueMin +","+ this.valueMax);
  }

  // called by the template when a text is entered
  search(term: string): void {
    this.searchTerms = term;
    this.searchTermsDate.next(term +","+ this.valueMin +","+ this.valueMax);
  }

}
