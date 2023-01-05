import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #map{
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-76.20501008022022, 4.100688516339272],
    zoom: 19
    });
  }

}
