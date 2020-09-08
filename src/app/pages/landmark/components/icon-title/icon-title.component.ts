import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-icon-title',
  templateUrl: './icon-title.component.html',
  styleUrls: ['./icon-title.component.scss']
})
export class IconTitleComponent implements OnInit, AfterViewInit {

  @Input() icon: string = "";
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() lat: number;
  @Input() lng: string;
  @Input() hasMap: boolean = false;

  private map;
  private tileUrl: string = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
   if (this.hasMap) {
     setTimeout(() => {
       this.initMap();
     }, 1000);
   }
  }


  private initMap(): void {
    const container = document.getElementById('map');
    if (container) {
      this.map = L.map('map').setView([this.lng, this.lat], 13);

      L.tileLayer(this.tileUrl, {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([this.lng, this.lat]).addTo(this.map);
    }

  }

}
