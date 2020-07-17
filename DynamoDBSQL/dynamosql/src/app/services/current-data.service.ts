import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskConfig } from '../shared/models/task_config';

@Injectable({
  providedIn: 'root'
})
export class CurrentDataService {
  
  constructor() { }
  public columnsUpdated : Subject<Array<any>> = new Subject<Array<any>>();

  public columns: Array<string>;
  public resultError: string;

  private _data: Array<any>;
  public get Data(): Array<any>{
    return this._data;
  }
  public set Data(d: Array<any>){
    this._data = d;
    if(d != null)
    {
      this.columns = this.getColumns(d);
      this.resultError = null;
    }
    else
    {
      this.columns = null;
    }
    this.columnsUpdated.next(d);
  }

  private _config: TaskConfig;
  public get Config(): TaskConfig{
    return this._config;
  }
  public set Config( c: TaskConfig){
     this._config = c;
  }

  getColumns(content:Array<any>):Array<string> {
    let columns:Array<string>=[];
    if(!content) return columns;
    content.forEach(row=>
      {
        Object.keys(row).forEach(key=>{
          if(columns.indexOf(key)<0)
          {
            columns.push(key);
          }
        });
    });
    console.log(columns);
    return columns;
  }

  setErrorState(error:string){
    this.Data = null;
    this.resultError = error;
    this.columns = null;
  }
}
