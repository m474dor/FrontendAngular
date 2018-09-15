import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NewRouteComponent } from './new-route/new-route.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PublicRoutesComponent } from './public-routes/public-routes.component';
import { UpdateRouteComponent } from './update-route/update-route.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { MapaComponent } from './mapa/mapa.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    MessagesComponent,
    NewUserComponent,
    HomeUserComponent,
    HomeAdminComponent,
    LoginComponent,
    NewRouteComponent,
    RouteDetailComponent,
    NewNoteComponent,
    NoteDetailComponent,
    LoginAdminComponent,
    PublicRoutesComponent,
    UpdateRouteComponent,
    MyRoutesComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYiXRMedOlCJm5pDHXaf5NY3mD2YIavEs'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
