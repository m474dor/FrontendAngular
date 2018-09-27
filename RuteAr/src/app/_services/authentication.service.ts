import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { url } from '../page-url';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { MessageService } from './message.service';

const header = {
'Content-Type': 'application/json',
'Access-Control-Allow-Headers': 'Content-Type',
'Access-Control-Allow-Methods': 'GET',
'Access-Control-Allow-Origin': '*'
};
const httpOptions = {
  headers: new HttpHeaders(header)
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private URL: string = url+'rest/usuarios';
  home:string;
  user: User;
  constructor(
    private http:HttpClient,
    private router: Router,
    private messageService: MessageService
    ) { }

  login(username: string, password: string):Observable<User> {
    //this.logout();
    this.user = new User;
    this.user.userName = username;
    this.user.password = password;
    return this.http.post<User>(this.URL+"/login", this.user,httpOptions)
    .pipe(map(user => {
    // login successful if there's a jwt token in the response
    	if (user) {
    		// store user details and jwt token in local storage to keep user logged in between page refreshes
      	localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('admin', JSON.stringify('no'));
        this.home = "/homeUser";
    	}
    	return user;
    }),catchError(this.handleError<any>('loginUser')));
    }

  loginAdmin(username: string, password: string):Observable<User> {
    //this.logout();
    this.user = new User;
    this.user.userName = username;
    this.user.password = password;
    return this.http.post<User>(this.URL+"/loginAdmin", this.user,httpOptions)
    .pipe(map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('admin', JSON.stringify('si'));
        this.home = "/homeAdmin";
      }
      return user;
    }),catchError(this.handleError<any>('loginAdmin')));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRoute');        
        localStorage.removeItem('modificada');
        localStorage.removeItem('admin');

        this.router.navigate(['login']);
    }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ${message}');
  }

  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log('${operation} failed: ${error.message}');
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
