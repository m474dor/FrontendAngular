import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User=new User;

  constructor(    
    private router: Router,
  	private auth: AuthenticationService,
  	private location: Location
  	) { }

  ngOnInit() {
  	this.auth.logout();
  }

  onSubmit(): void{
    this.auth.logout();
    this.auth.login(this.user.userName,this.user.password).pipe(first())
    .subscribe(
      user => {
        if(user)
    		  this.router.navigate([this.auth.home]);
        else console.log("no existe o fue bloqueado");
      }/*,
      error => {
        this.alertService.error(error);
      }*/);
  }

  goBack():void{
  	this.location.back();
  }
}
