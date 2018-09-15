import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User=new User;
  constructor(    
    private router: Router,
  	private userService: UserService,
    private auth: AuthenticationService,
  	private location: Location
  	) { }

  ngOnInit() {
  }

  onSubmit(): void{
    this.auth.logout();
    this.user.isEnable=true;
    this.user.password=Math.floor(Math.random()*1000000000000).toString();
    if(this.user.id!=null){
      this.userService.update(this.user).subscribe(user => this.log());
      
    }else{
      this.userService.register(this.user).subscribe(user => this.log());
      
    }
  }

  log():void {
    this.auth.login(this.user.userName,this.user.password)
      .subscribe(user => {
        if(user)
          this.router.navigate([this.auth.home]);
        else console.log("no existe o fue bloqueado");
      });
  }

  goBack():void{
  	this.location.back();
  }
}
