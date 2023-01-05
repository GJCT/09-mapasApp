import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container{
      height: 100%;
      width: 100%;
    }
    
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor: pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit{
  @ViewChild('map') divMapa!: ElementRef;
  map!: mapboxgl.Map;
  zoomLavel: number = 19;
  lngLat: [number, number] = [-76.20501008022022, 4.100688516339272];

  //Arreglo de marcadores
  marcadores: MarkerColor[] = [];
    
  constructor(){}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.lngLat,
    zoom: this.zoomLavel
    });

    this.leerLocalStorage();

    // const makerHtml: HTMLElement = document.createElement('div');
    // makerHtml.innerHTML='Hola mundo';

    // new mapboxgl.Marker({
    //   // element: makerHtml
    // })
    //     .setLngLat(this.lngLat)
    //     .addTo(this.map);
  }

  agregarMarker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);

    this.marcadores.push({
      color,
      marker: nuevoMarker
    });

    this.guardarMarkerLocalStorage();

    nuevoMarker.on('dragend', () =>{
      this.guardarMarkerLocalStorage();
    });
  }

  irMarcador(marker: mapboxgl.Marker){
    this.map.flyTo({
      center: marker.getLngLat()
    });
  }

  guardarMarkerLocalStorage(){
    const lngLatArr: MarkerColor [] = []

    this.marcadores.forEach(m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m=>{
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.map);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () =>{
        this.guardarMarkerLocalStorage();
      });
    });
    
  }

  borrarMarker(i: number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarkerLocalStorage();
  }
}
