import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 99999;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMapa!: ElementRef;
  map!: mapboxgl.Map;
  zoomLavel: number = 19;
  lngLat: [number, number] = [-76.20501008022022, 4.100688516339272];
  
  constructor(){  }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.lngLat,
    zoom: this.zoomLavel
    });

    this.map.on('zoom', (ev) => {
      this.zoomLavel = this.map.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if(this.map.getZoom()>19){
        this.map.zoomTo(19);
      }
    });

    //Movimiento del mapa
    this.map.on('move', (event) => {
      const tagert = event.target;
      const {lng, lat} = tagert.getCenter();
      this.lngLat = [lng, lat];
    })
  }

  zoomOut(){
    this.map.zoomOut();
    // this.zoomLavel = this.map.getZoom();
  }

  zoomIn(){
    this.map.zoomIn();
    // this.zoomLavel = this.map.getZoom();
  }

  zoomCambio(valor: string){
    this.map.zoomTo(Number(valor));
  }

}
