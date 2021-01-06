import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import * as Mapboxgl from 'mapbox-gl';
import { stores } from './services/data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {    
  map: Mapboxgl.Map;  
  myStores = stores;

  ngOnInit(): void {
    Mapboxgl.accessToken = environment.accessToken;

    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-77.034084, 38.909671],
      zoom: 14
    });   

    this.map.on('load', () => {
      /* Add the data to your map as a layer */      

      this.map.addLayer({
        "id": "locations",
        "type": "symbol",
        /* Add a GeoJSON source containing place coordinates and information. */
        "source": {
          "type": "geojson",
          "data": this.myStores
        },
        "layout": {
          "icon-image": "restaurant-15",
          "icon-allow-overlap": true,
        }
      });
    });
  }  
}
