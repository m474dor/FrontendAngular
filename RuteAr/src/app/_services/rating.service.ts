import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Rating } from '../_models/rating';
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
export class RatingService {
private URL: string = url+'rest/puntajes';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getPuntajes(id: number):Observable<Rating[]> {
    this.messageService.add('RatingService: fetched ratings');
    return this.http.get<Rating[]>(this.URL+'/todos/'+id).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getUserRating(id: number, user: number):Observable<Rating> {
    this.messageService.add('RatingService: fetched rating - user id=${id}');
    return this.http.get<Rating>(this.URL+'/'+id+'/'+user).pipe(
      catchError(this.handleError<Rating>('getByUser id=${id}'))
    );
  }

  register(rating: Rating):Observable<Rating> {
    return this.http.post<Rating>(this.URL, rating,httpOptions).pipe(
      catchError(this.handleError<Rating>('register'))
    );
  }

  update(rating: Rating):Observable<Rating> {
    return this.http.put(this.URL,rating,httpOptions).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: number):Observable<Response> {
    return this.http.delete(this.URL+'/delete/'+id,httpOptions).pipe(
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