import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rute.Ar';
  user: string;
  admin: string;
  constructor(private auth: AuthenticationService) {}
  
  ngOnInit() {
    this.admin = localStorage.getItem('admin');
    this.user = localStorage.getItem('user');
  }

  logout(): void {
  	this.auth.logout();
  }
}
