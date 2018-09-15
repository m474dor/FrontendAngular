import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NewRouteComponent }   from './new-route/new-route.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UpdateRouteComponent } from './update-route/update-route.component';
import { PublicRoutesComponent } from './public-routes/public-routes.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';


const routes: Routes = [
	{path: 'homeAdmin', component: HomeAdminComponent},
	{path: 'homeUser', component: HomeUserComponent},
	{path: 'login', component: LoginComponent},
	{path: 'loginAdmin', component: LoginAdminComponent},
	{path: 'newUser', component: NewUserComponent},
	{path: 'newRoute', component: NewRouteComponent},
	{path: 'myRoutes', component: MyRoutesComponent},
	{path: 'updateRoute', component: UpdateRouteComponent},
	{path: 'publicRoutes', component: PublicRoutesComponent},
	{path: 'detail/:id', component: UserDetailComponent},
	{path: 'detailRoute/:id', component: RouteDetailComponent},
	{ path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
