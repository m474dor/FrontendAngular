import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../_models/note';
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
export class NoteService {
private URL: string = url+'rest/notas';

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getAll(id: number):Observable<Note[]> {
    this.messageService.add('NoteService: fetched notes');
    return this.http.get<Note[]>(this.URL+'/ruta/'+id).pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getById(id: number):Observable<Note> {
    this.messageService.add('NoteService: fetched note id=${id}');
    return this.http.get<Note>(this.URL+'/'+id).pipe(
      catchError(this.handleError<Note>('getById id=${id}'))
    );
  }

  /*getTypes(): Observable<Note[]> {
    this.messageService.add('NoteService: fetched tipos notas');
    return this.http.get<Note[]>(this.URL).pipe(
      catchError(this.handleError('getTipos', []))
    );
  }*/

  register(note: Note):Observable<Note> {
    return this.http.post<Note>(this.URL, note,httpOptions).pipe(
      catchError(this.handleError<Note>('register'))
    );
  }

  update(note: Note):Observable<Note> {
    return this.http.put(this.URL,note,httpOptions).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: number):Observable<Note> {
    return this.http.delete<Note>(this.URL+'/'+id,httpOptions).pipe(
      catchError(this.handleError<Note>('delete'))
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
 
    // TODO: better job of transforming error for Note consumption
    this.log('${operation} failed: ${error.message}');
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
