import { Component, OnInit, Input } from '@angular/core';
import { Mappoint } from '../_models/mappoint';
import { MapPointService } from '../_services/map-point.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
	lat: number = 36.07954952145647;
  lng: number = -112.2550785337791;
  kml: Mappoint[];
  @Input() id: number;
  constructor(    
    private mapPointService: MapPointService,
  ) {}

  ngOnInit() {
    this.getKml();
  }

  getKml(): void {
    this.mapPointService.getFile(this.id).subscribe(
      data => { 
        this.kml = data;
      },
      error => console.log("Error downloading the file."),
      () => console.log('Completed file download.'));
  }

}
