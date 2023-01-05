import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`
    div{
      width: 100%;
      height: 150%;
      margin: 0px;
    }
  `]
})
export class MiniMapaComponent implements AfterViewInit{
  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('map') divMap!: ElementRef;

  constructor(){}
  
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 17,
      interactive: false
      });

      new mapboxgl.Marker()
          .setLngLat(this.lngLat)  
          .addTo(map)
  }

}