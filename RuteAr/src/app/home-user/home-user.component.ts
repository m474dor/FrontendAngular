import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Route } from '../_models/route';
import { RouteService } from '../_services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

	currentUser: User = new User;
	route: Route;
  routes:Route[]=[];
  constructor(
    private routeService: RouteService,
    private router: Router
    ) {
    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  updateRoute(rut:Route){
    localStorage.setItem('currentRoute', JSON.stringify(rut));
    this.router.navigate(['newRoute']);
  }
  
  deleteRoute(rut:Route){
    this.routeService.delete(rut.id).subscribe(data => window.location.reload(true));
  }

}
