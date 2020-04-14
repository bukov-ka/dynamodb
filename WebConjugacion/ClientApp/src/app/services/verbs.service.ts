import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Word } from '../shared/models/word';

@Injectable({
  providedIn: 'root'
})
export class VerbsService {

  constructor(private http: HttpClient) { }

  getVerbs(): Observable<Word[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<Word[]>('allVerbsForm.json', httpOptions)      
      .pipe(
        catchError(err => {
          return throwError(err);
          }
        )
      )
      .pipe(map((m) => {
        return m.map(mi => {
          return new Word(mi);
        })
          .filter(f => f.word.length > 1);
      }))
      ;
  }

}
