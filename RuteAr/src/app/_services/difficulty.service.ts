import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Difficulty } from '../_models/difficulty';
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
export class DifficultyService {
private URL: string = url+'rest/dificultades';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getAll():Observable<Difficulty[]> {
    this.messageService.add('DifficultyService: fetched difficulties');
    return this.http.get<Difficulty[]>(this.URL).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getById(id: number):Observable<Difficulty> {
    this.messageService.add('DifficultyService: fetched difficulty id=${id}');
    return this.http.get<Difficulty>(this.URL+'/'+id).pipe(
      catchError(this.handleError<Difficulty>('getById id=${id}'))
    );
  }

  register(difficulty: Difficulty):Observable<Difficulty> {
    return this.http.post<Difficulty>(this.URL, difficulty,httpOptions).pipe(
      catchError(this.handleError<Difficulty>('register'))
    );
  }

  update(difficulty: Difficulty):Observable<Difficulty> {
    return this.http.put(this.URL,difficulty,httpOptions).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: number):Observable<Difficulty> {
    return this.http.delete<Difficulty>(this.URL+'/'+id,httpOptions).pipe(
      catchError(this.handleError<Difficulty>('delete'))
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
 
    // TODO: better job of transforming error for Difficulty consumption
    this.log('${operation} failed: ${error.message}');
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
