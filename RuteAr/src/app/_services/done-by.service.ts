import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '../_models/route';
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
export class DoneByService {
private URL: string = url+'rest/realizadas';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getUsers(id: number):Observable<User[]> {
    this.messageService.add('DoneByService: fetched users');
    return this.http.get<User[]>(this.URL+'/'+id).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  register(user: User,id: number):Observable<Response> {
    return this.http.post(this.URL+'/'+id, user,httpOptions).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  delete(user: User,id: number):Observable<Response> {
    return this.http.delete(this.URL+'/'+id+'/'+user.id,httpOptions).pipe(
      catchError(this.handleError<any>('delete'))
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