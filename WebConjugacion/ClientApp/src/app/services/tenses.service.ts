import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tense } from '../shared/models/tense';
import { Mood } from '../shared/models/mood';


@Injectable({
  providedIn: 'root'
})
export class TensesService {

  constructor(private http: HttpClient) {
  }

  getTenses(): Observable<Mood[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.get<Mood[]>('filterTree.json', httpOptions)
        .pipe(
          catchError(err => {
            return throwError(err);
          }
          )
        );
    }
}
