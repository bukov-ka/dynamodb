import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TaskConfig } from '../shared/models/task_config';

@Injectable({
  providedIn: 'root'
})
export class TasksConfigService {

  constructor(private http: HttpClient) { }

  getConfigById(id: number): Observable<TaskConfig> {
    var items = ["", "simple", "one-to-many", "many-to-many", "hierarcical-queries", "leaderboard", "sparse"];
    return this.getConfig(items[id]);
  }
  private getConfig(name: string): Observable<TaskConfig> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<TaskConfig>('assets/' + name + '.json', httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err);
        }
        )
      );
  }

}
