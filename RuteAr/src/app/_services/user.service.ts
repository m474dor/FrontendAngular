import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { MessageService } from './message.service';
import { url } from '../page-url';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL: string = url+'rest/usuarios';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getAll():Observable<User[]> {
    this.messageService.add('UserService: fetched users');
    return this.http.get<User[]>(this.URL).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getById(id: number):Observable<User> {
    this.messageService.add('UserService: fetched user id=${id}');
    return this.http.get<User>(this.URL+'/'+id).pipe(
      catchError(this.handleError<User>('getById id=${id}'))
    );
  }

  register(user: User):Observable<User> {
    return this.http.post<User>(this.URL, user,httpOptions).pipe(
      catchError(this.handleError<User>('register'))
    );
  }

  update(user: User):Observable<User> {
    return this.http.put<User>(this.URL,user,httpOptions).pipe(
      catchError(this.handleError<User>('update'))
    );
  }

  delete(id: number):Observable<User> {
    return this.http.delete<User>(this.URL+'/'+id,httpOptions).pipe(
      catchError(this.handleError<User>('delete'))
    );
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
