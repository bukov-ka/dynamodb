import { Component, OnInit } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';
import * as alasql from 'alasql';

@Component({
  selector: 'app-live-sql',
  templateUrl: './live-sql.component.html',
  styleUrls: ['./live-sql.component.scss'],
  providers: [CurrentDataService]
})
export class LiveSqlComponent implements OnInit {

  sqlText:string = "SELECT * FROM Music";  

  constructor(private currentDataService: CurrentDataService) { 
    console.log(this.currentDataService);
  }

  ngOnInit(): void {
  }
  
  showSQL():void{
    var sqlWithCsvNames = this.sqlText.replace("Music", "CSV(\"assets/csv/music.csv\",  {headers:true})");
    let self = this;
    alasql.default.promise(sqlWithCsvNames)    
    .then(function(data){
      self.currentDataService.Data=data;
    }).catch(function(err){
      self.currentDataService.setErrorState(err);      
      console.log(self.currentDataService.resultError);
    });
  }

  
}
