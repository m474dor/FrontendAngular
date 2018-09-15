import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Activity } from '../_models/activity';
import { UserService } from '../_services/user.service';
import { ActivityService } from '../_services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  selectedUser:User;
	users: User[] = [];
  selectedActivity: Activity;
  activities: Activity[] = [];
  activity: Activity = new Activity();

  constructor(private userService: UserService,
    private activityService: ActivityService,
    private router: Router
    ) { }

  ngOnInit() {
  	this.getUsers();
    this.getActivities();
  }

	getUsers(): void{
		this.userService.getAll().subscribe(users => this.users = users);
	}
  getActivities(): void{
    this.activityService.getAll().subscribe(activities => this.activities = activities);
  }

  blockUser(user: User): void{
    this.selectedUser=user;
    this.selectedUser.isEnable=!this.selectedUser.isEnable;
    this.userService.update(this.selectedUser).subscribe();
  }

  onSubmit(): void{
    if(this.activity.id!=null){
      this.activityService.update(this.activity).subscribe(data => window.location.reload(true));
    }else{
      this.activityService.register(this.activity).subscribe(data => window.location.reload(true));
    }
    //this.router.navigate(['homeAdmin']);
  }

  updateActivity(activity: Activity): void{
    this.selectedActivity=activity;
    this.activityService.update(this.selectedActivity).subscribe(data => window.location.reload(true));
  }

  deleteActivity(activity: Activity): void{
    this.selectedActivity=activity;
    this.activityService.delete(this.selectedActivity.id).subscribe(data => window.location.reload(true));
  }

  sortByNameASC():void{
    this.users.sort((a,b):number => {
      if(a.name<b.name) return -1;
      if(a.name>b.name) return 1;
      return 0;
    });
  }

  sortByNameDES():void{
    this.users.sort((a,b):number => {
      if(a.name>b.name) return -1;
      if(a.name<b.name) return 1;
      return 0;
    });
  }

  sortByIdASC():void{
    this.users.sort((a,b):number => {
      if(a.id<b.id) return -1;
      if(a.id>b.id) return 1;
      return 0;
    });
  }

  sortByIdDES():void{
    this.users.sort((a,b):number => {
      if(a.id>b.id) return -1;
      if(a.id<b.id) return 1;
      return 0;
    });
  }
}
