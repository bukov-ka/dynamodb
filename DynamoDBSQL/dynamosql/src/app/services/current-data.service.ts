import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentDataService {
  
  constructor() { }
  public columns: Array<string>;
  public resultError: string;

  private _data: Array<any>;
  public get Data(): Array<any>{
    return this._data;
  }
  public set Data(d: Array<any>){
    this._data = d;
    if(d!=null)
    {
      this.columns = this.getColumns(d);
      this.resultError = null;
    }
  }

  getColumns(content:Array<any>):Array<string> {
    let columns:Array<string>=[];
    if(!content) return columns;
    Object.keys(content[0]).forEach(key=>{
      columns.push(key);
    });
    return columns;
  }

  setErrorState(error:string){
    this.Data = null;
    this.resultError = error;
    this.columns = null;
  }
}
