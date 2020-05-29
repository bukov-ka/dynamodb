import { Component, OnInit } from '@angular/core';
import * as alasql from 'alasql';

@Component({
  selector: 'app-live-sql',
  templateUrl: './live-sql.component.html',
  styleUrls: ['./live-sql.component.scss']
})
export class LiveSqlComponent implements OnInit {

  sqlText:string = "SELECT * FROM Music";
  resultData:Array<any>;
  resultError:string;
  constructor() { 
  }

  ngOnInit(): void {
  }
  
  showSQL():void{
    console.log(this.sqlText);
    var sqlWithCsvNames = this.sqlText.replace("Music", "CSV(\"assets/csv/music.csv\",  {headers:true})");
    let self = this;
    alasql.default.promise(sqlWithCsvNames)    
    .then(function(data){
      console.log('It works! I think...');
      self.resultData=data;
      self.resultError=null;
      console.log(data);
    }).catch(function(err){
      console.log('Error:', err);
      self.resultError = err;
      self.resultData = null;
    });
  }
}
