import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity } from '../_models/activity';
import { MessageService } from './message.service';
import { url } from '../page-url';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
private URL: string = url+'rest/actividades';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getAll():Observable<Activity[]> {
    this.messageService.add('ActivityService: fetched activities');
    return this.http.get<Activity[]>(this.URL).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getById(id: number):Observable<Activity> {
    this.messageService.add('ActivityService: fetched activity id=${id}');
    return this.http.get<Activity>(this.URL+'/'+id).pipe(
      catchError(this.handleError<Activity>('getById id=${id}'))
    );
  }

  register(activity: Activity):Observable<Activity> {
    return this.http.post<Activity>(this.URL, activity,httpOptions).pipe(
      catchError(this.handleError<Activity>('register'))
    );
  }

  update(activity: Activity):Observable<Activity> {
    return this.http.put(this.URL,activity,httpOptions).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: number):Observable<Activity> {
    return this.http.delete<Activity>(this.URL+'/'+id,httpOptions).pipe(
      catchError(this.handleError<Activity>('delete'))
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
