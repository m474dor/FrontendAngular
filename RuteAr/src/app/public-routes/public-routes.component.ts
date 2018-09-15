import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Route } from '../_models/route';
import { Activity } from '../_models/activity';
import { Difficulty } from '../_models/difficulty';
import { RouteService } from '../_services/route.service';
import { ActivityService } from '../_services/activity.service';
import { DifficultyService } from '../_services/difficulty.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-public-routes',
  templateUrl: './public-routes.component.html',
  styleUrls: ['./public-routes.component.css']
})
export class PublicRoutesComponent implements OnInit {
	route: Route;
  routes:Route[]=[];
  allRoutes: Route[] = [];
  activities: Activity[] = [];
  difficulties: Difficulty[] = [];
  sortId: boolean = false;
  sortName: boolean = false;
  sortLong: boolean = false;
  sortDiff: boolean = false;
  sortRate: boolean = false;
  sortCount: boolean = false;

  constructor(    
  	private routeService: RouteService,
    private actService: ActivityService,
    private difService: DifficultyService,
    private router: Router,
    private location: Location) { }


  ngOnInit() {
  	this.getPublicRoutes();
    this.actService.getAll().subscribe(activities => this.activities = activities);
    this.difService.getAll().subscribe(difficulties => this.difficulties = difficulties);
  }

  getPublicRoutes(): void {
    this.routeService.getPublic().subscribe(routes => {this.routes = routes;this.allRoutes = routes;});
  }
  
  onFormat(event): void {
    this.routes = Object.assign([],this.allRoutes);
    const val = event.target.value;
    for(var i=0;i<this.routes.length;i++){
      if(this.routes[i].isCircular!=val){
        this.routes.splice(i,1);
        i=-1;
      }
    }
  }

  onActivity(event): void {
    this.routes = Object.assign([],this.allRoutes);
    const val = event.target.value;
    for(var i=0;i<this.routes.length;i++){
      if(this.routes[i].activity.name!=val){
        this.routes.splice(i,1);
        i=-1;
      }
    }
  }

  onDifficulty(event): void {
    this.routes = Object.assign([],this.allRoutes);
    const val = event.target.value;
    for(var i=0;i<this.routes.length;i++){
      if(this.routes[i].difficulty.difficulty!=val){
        this.routes.splice(i,1);
        i=-1;
      }
    }
  }

  orderId(): void {
    this.sortId=!this.sortId;
    if(this.sortId)
      this.routes.sort((a,b): number => {return a.id - b.id; });
    else 
      this.routes.sort((a,b): number => {return b.id - a.id; });
  }

  orderName(): void {
    this.sortName=!this.sortName;
    if(this.sortName)
      this.routes.sort((a,b): number => {
        if (a.name > b.name)
           return 1;
        if (a.name < b.name)
            return -1;
        return 0;
      });
    else 
      this.routes.sort((a,b): number => {
        if (a.name < b.name)
           return 1;
        if (a.name > b.name)
            return -1;
        return 0;
      });
  }

  orderLong(): void {
    this.sortLong=!this.sortLong;
    if(this.sortLong)
      this.routes.sort((a,b): number => {
        if (a.length > b.length)
          return 1;
        if (a.length < b.length)
          return -1;
        return 0;
      });
    else
      this.routes.sort((a,b): number => {
        if (a.length < b.length)
          return 1;
        if (a.length > b.length)
          return -1;
        return 0;
      });
  }

  orderDiff(): void {
    this.sortDiff=!this.sortDiff;
    if(this.sortDiff)
      this.routes.sort((a,b): number => {
        if (a.difficulty.difficulty > b.difficulty.difficulty)
          return 1;
        if (a.difficulty.difficulty < b.difficulty.difficulty)
          return -1;
        return 0;
      });
    else
      this.routes.sort((a,b): number => {
        if (a.difficulty.difficulty < b.difficulty.difficulty)
          return 1;
        if (a.difficulty.difficulty > b.difficulty.difficulty)
          return -1;
        return 0;
      });
  }

  orderRate(): void {
    this.sortRate=!this.sortRate;
    if(this.sortRate)
      this.routes.sort((a,b): number => {
        if (a.rateAvg > b.rateAvg)
          return 1;
        if (a.rateAvg < b.rateAvg)
          return -1;
        return 0;
      });
    else
      this.routes.sort((a,b): number => {
        if (a.rateAvg < b.rateAvg)
          return 1;
        if (a.rateAvg > b.rateAvg)
          return -1;
        return 0;
      });
  }

  orderCount(): void {
    this.sortCount=!this.sortCount;
    if(this.sortCount)
      this.routes.sort((a,b): number => {
        if (a.doneByCount > b.doneByCount)
          return 1;
        if (a.doneByCount < b.doneByCount)
          return -1;
        return 0;
      });
    else
      this.routes.sort((a,b): number => {
        if (a.doneByCount < b.doneByCount)
          return 1;
        if (a.doneByCount > b.doneByCount)
          return -1;
        return 0;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
