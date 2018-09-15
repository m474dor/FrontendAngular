import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '../_models/route';
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
export class RouteService {
private URL: string = url+'rest/rutas';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getPublic():Observable<Route[]> {
    this.messageService.add('RouteService: fetched routes');
    return this.http.get<Route[]>(this.URL).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getMyRoutes(id: number):Observable<Route[]> {
    this.messageService.add('RouteService: fetched route id=${id}');
    return this.http.get<Route[]>(this.URL+'/myRoutes/'+id).pipe(
      catchError(this.handleError<Route[]>('getMyRoutes id=${id}'))
    );
  }

  getById(id: number):Observable<Route> {
    this.messageService.add('RouteService: fetched route id=${id}');
    return this.http.get<Route>(this.URL+'/'+id).pipe(
      catchError(this.handleError<Route>('getById id=${id}'))
    );
  }

  getDoneRoutes(id: number):Observable<Route[]> {
    this.messageService.add('RouteService: fetched route id=${id}');
    return this.http.get<Route[]>(this.URL+'/'+id).pipe(
      catchError(this.handleError<Route[]>('getDoneRoutes id=${id}'))
    );
  }

  register(route: Route):Observable<Route> {
    return this.http.post<Route>(this.URL, route,httpOptions).pipe(
      catchError(this.handleError<Route>('register'))
    );
  }

  update(route: Route):Observable<Route> {
    return this.http.put(this.URL,route,httpOptions).pipe(
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
