import { Component, OnInit } from '@angular/core';
import { NoteService } from '../_services/note.service';
import { RouteService } from '../_services/route.service';
import { ActivityService } from '../_services/activity.service';
import { DoneByService } from '../_services/done-by.service';
import { MapPointService } from '../_services/map-point.service';
import { PhotoService } from '../_services/photo.service';
import { MessageService } from '../_services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../_models/user';
import { Mappoint } from '../_models/mappoint';
import { Route } from '../_models/route';
import { Photo } from '../_models/photo';
import { Note } from '../_models/note';
import { Rating } from '../_models/rating';
import { Activity } from '../_models/activity';
import { dificultad } from '../_models/difficulty-type.enum';
import { RatingService } from '../_services/rating.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
	currentUser: User;
	route: Route;
	puntaje: number = 0;
	nota: Note = new Note;
	notas: Note[]=[];
	actividad: Activity;
  categories: string[]=['Dependencias','Alertas','Opiniones'];
  id: number = 0;
  modificada: boolean;
  rating: Rating = new Rating;
  ratings: Rating[] = [];
  usuarios: User[] = [];
  photos: Blob[] = [];
  didit: boolean;
  kml: Mappoint[]=[];
  photosClass: Photo[] = [];
  urls: any[] = [];
  ready: boolean;

  constructor(
  	private noteService: NoteService,
  	private routeService: RouteService,
  	private messageService: MessageService,
    private ratingService: RatingService,
    private doneByService: DoneByService,
    private mapPointService: MapPointService,
    private photoService: PhotoService,
  	private activityService: ActivityService,
  	private routeAct: ActivatedRoute,  
  	private router: Router, 	
  	private location: Location,
    private sanitizer: DomSanitizer
	) { }

  ngOnInit() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = Number(this.routeAct.snapshot.paramMap.get('id'));
    this.modificada = true;
    this.didit = false;
    this.ready = false;
  	this.getRoute();
  }

  check():boolean{
    if(this.route.doneByCount==0 && this.route.rateAvg==0 && 
      (this.notas.length==0 || this.notas==null)){
      this.modificada=false;
    }
    return this.modificada;
  }

	privacity(){
		this.route.isPublic=!this.route.isPublic;
		this.routeService.update(this.route).subscribe(data => 
      window.location.reload(true));
	}

  updateRoute(): void{
  	localStorage.setItem('currentRoute', 
      JSON.stringify(this.route));
    this.check();
    localStorage.setItem('modificada', 
      JSON.stringify(this.modificada));
    this.router.navigate(['newRoute']);
  }

  deleteRoute(): void{
  	if(!this.check()){
  		this.routeService.delete(this.id).subscribe(data => this.router.navigate(['homeUser']));
  	}
  	else{
  		this.messageService.add('La ruta no se puede eliminar');
      console.log("no se pudo eliminar")
  	}
  }

  rateAvg(): void{
    this.rating.rateBy=this.currentUser;
    this.rating.route=this.route;
    if(this.rating.id!=null){
      this.ratingService.update(this.rating).subscribe(rating => {
        this.rating = rating;
        window.location.reload(true);
      });
    }else{
      this.ratingService.register(this.rating).subscribe(rating => {
        this.rating = rating;
        window.location.reload(true);
      });
    }
  }

  leaveNote(): void{
  	this.nota.route=this.route;
  	this.nota.user=this.currentUser;
  	this.noteService.register(this.nota).subscribe(data => 
      window.location.reload(true));
  }

  getRoute(): void{
  	this.routeService.getById(this.id).subscribe(route => {
      this.route=route;
      this.getNotes();
      this.getPhotos();
    });
  }

  getNotes(): void{
  	this.noteService.getAll(this.id).subscribe(notas => {
      this.notas=notas;
      this.getRatings();
    });
  }

  getRatings(): void{
    this.ratingService.getPuntajes(this.id).subscribe(ratings => {
      this.ratings = ratings;
      this.getUsers();
    });
  }

  getPhotos(): void {
    this.photoService.getPhotosClass(this.id).subscribe(
      data => {
        this.photosClass = data;
        console.log(this.photosClass);
        console.log(data);
        for(var a=0;a<this.photosClass.length;a++){
          this.photoService.getPhotos(this.photosClass[a].id).
          subscribe(photo => {
            this.photos.push(photo);
            this.urls.push(
              this.sanitizer.bypassSecurityTrustUrl(
                window.URL.createObjectURL(photo)));
            console.log(this.urls);
            console.log(this.photos);
          });
        }
      });
  }

  getUsers(): void{
    this.doneByService.getUsers(this.id).subscribe(usuarios => {
      this.usuarios = usuarios;
      this.updateRating();
    });
  }

  updateRating(): void{
    var aux = 0;
    for (var i = 0; i < this.ratings.length; ++i) {
      aux += this.ratings[i].rating;
    }

    if(aux!=0){
      this.route.rateAvg=(aux/this.ratings.length);
    }
    if(this.ratings!=null){ 
      for(var i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].rateBy.id == this.currentUser.id) {
          this.rating = this.ratings[i];
          break;
        }
      }
    }
    if(this.usuarios!=null){ 
      for(var i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].id == this.currentUser.id) {
          this.didit = true;
          break;
        }
      }
      this.route.doneByCount=this.usuarios.length;
    }
    this.routeService.update(this.route).subscribe(route => {
      this.route = route;
    });
  }

  didIt():void {
    if(this.didit)
      this.doneByService.delete(this.currentUser,this.id).subscribe(data => {window.location.reload(true)});
    else
      this.doneByService.register(this.currentUser,this.id).subscribe(data => {window.location.reload(true)});

  }
  
  goBack():void{
  	this.location.back();
  }
}
