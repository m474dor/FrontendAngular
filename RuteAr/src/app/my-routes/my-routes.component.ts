import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Route } from '../_models/route';
import { RouteService } from '../_services/route.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css']
})
export class MyRoutesComponent implements OnInit {
  routes:Route[]=[];
	currentUser: User;
  sortId: boolean = false;
  sortName: boolean = false;
  sortLong: boolean = false;
  sortDiff: boolean = false;
  sortRate: boolean = false;
  sortCount: boolean = false;
  
  constructor(
  	private routeService: RouteService,
    private router: Router,
    private location: Location) {
    }

  ngOnInit() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getMyRoutes();
  }
  getMyRoutes(): void{
    this.routeService.getMyRoutes(this.currentUser.id).subscribe(routes => this.routes = routes);
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
