import { Component, OnInit } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';
import * as alasql from 'alasql';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TasksConfigService } from '../services/tasks-config.service';

@Component({
  selector: 'app-live-sql',
  templateUrl: './live-sql.component.html',
  styleUrls: ['./live-sql.component.scss'],
  providers: [CurrentDataService]
})
export class LiveSqlComponent implements OnInit {

  sqlText:string = "SELECT * FROM Music";  

  private paramSubscription: Subscription;
  constructor(public currentDataService: CurrentDataService,
    private route: ActivatedRoute,
    private taskConfigService: TasksConfigService,
    ) { 
      this.paramSubscription = route.params.subscribe(params=>console.log(params['id']));
      taskConfigService.getConfig("simple").subscribe(s=>{
        console.log(s);
      });
  }

  ngOnInit(): void {  
  }
    
  ngOnDestroy():any{
    this.paramSubscription.unsubscribe();
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


    /*alasql.default.promise('select * from xlsx("assets/csv/test_tables.xlsx",{sheetid:"table2"})')    
    .then(function(data){
      console.log('xlsx');
      console.log(data);
    }).catch(function(err){
      console.log('xlsx err');
      console.log(err);
    });*/
  }

  
}
