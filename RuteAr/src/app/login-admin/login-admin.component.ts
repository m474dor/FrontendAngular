import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  user: User=new User();

  constructor(    
    private router: Router,
  	private auth: AuthenticationService,
  	private location: Location
  	) { }

  ngOnInit() {
  }

  onSubmit(): void{
    this.auth.loginAdmin(this.user.userName,this.user.password).pipe(first())
    .subscribe(
      data => {
    		this.router.navigate([this.auth.home]);
      }/*,
      error => {
        this.alertService.error(error);
      }*/);
  }

  goBack():void{
  	this.location.back();
  }
}
