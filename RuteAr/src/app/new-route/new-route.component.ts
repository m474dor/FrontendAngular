import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../_services/activity.service';
import { RouteService } from '../_services/route.service';
import { DifficultyService } from '../_services/difficulty.service';
import { PhotoService } from '../_services/photo.service';
import { MapPointService } from '../_services/map-point.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Activity } from '../_models/activity';
import { User } from '../_models/user';
import { Route } from '../_models/route';
import { Photo } from '../_models/photo';
import { Difficulty } from '../_models/difficulty';
import { dificultad } from '../_models/difficulty-type.enum';

//import { DifficultyType } from '../_models/difficulty-type.enum';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent implements OnInit {
	activities: Activity[] = [];
	currentUser: User;
	route: Route = new Route;
  aux: Route;
	difficulties: Difficulty[] = [];
  modificada: boolean;
  photos: File[] = [];
  selectedFile: File;
  constructor(
  	private actService: ActivityService,
  	private routeService: RouteService,
    private difficultyService: DifficultyService,
    private photoService: PhotoService,
    private mapPointService: MapPointService,
  	private router: Router,
    private location: Location) {}

  ngOnInit() {
  	this.actService.getAll().subscribe(activities => this.activities = activities);
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.difficultyService.getAll().subscribe(difficulties => this.difficulties=difficulties);
    this.modificada = false;
    this.modificada = JSON.parse(localStorage.getItem('modificada'));
    localStorage.removeItem('modificada');
    this.aux = JSON.parse(localStorage.getItem('currentRoute'));
    if(this.aux!=null){
      this.route=this.aux;
      localStorage.removeItem('currentRoute');
      this.photoService.getPhotos(this.route.id).subscribe(photos => this.photos = photos);
    }
  }

  getKMLDetails(event): void {
    this.selectedFile = event.target.files[0];
  }

  getFileDetails(event): void {
    this.photos = [];
    for(var i=0;i<event.target.files.length;i++){
      this.photos.push(event.target.files[i]);
    }
  }

  onSubmit() {
  	this.route.owner=this.currentUser;
  	if(this.route.id!=null){
      this.routeService.update(this.route).subscribe(route => {
        this.route = route;
        this.photoService.update(this.photos,this.route.id).subscribe(
          data => {if(this.modificada) this.router.navigate(['homeUser']);
          });
        if(!this.modificada){
          this.mapPointService.update().subscribe(
            data => this.router.navigate(['homeUser']));
        }
      });
    }else{
    	this.route.doneByCount=0;
    	this.route.rateAvg=0;
      this.routeService.register(this.route).subscribe(route => {
        this.route = route;
        this.photoService.register(this.photos,this.route.id).subscribe();
        this.mapPointService.register().subscribe(
          data => this.router.navigate(['homeUser']));
      });
    }
  }

  goBack():void{
    this.location.back();
  }
}
