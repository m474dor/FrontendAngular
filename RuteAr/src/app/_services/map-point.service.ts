import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mappoint } from '../_models/mappoint';
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
export class MapPointService {
private URL: string = url+'rest/kml';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getFile(id: number):Observable<Mappoint[]> {
    this.messageService.add('KMLService: fetched KML');
    return this.http.get(this.URL+'/'+id).pipe(
      catchError(this.handleError<any>('getAll'))
    );
  }


  register(file: File, id: number, fileDetail: string):Observable<Response> {
    return this.http.post(this.URL+'/'+id+'/'+fileDetail, file,httpOptions).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  update(file: File, id: number):Observable<Response> {
    return this.http.put(this.URL+'/'+id, file,httpOptions).pipe(
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