import { Component, OnInit } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';
import * as alasql from 'alasql';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TasksConfigService } from '../services/tasks-config.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-live-sql',
  templateUrl: './live-sql.component.html',
  styleUrls: ['./live-sql.component.scss'],
  providers: [CurrentDataService]
})
export class LiveSqlComponent implements OnInit {

  sqlText:string;

  private paramSubscription: Subscription;
  constructor(public currentDataService: CurrentDataService,
    private route: ActivatedRoute,
    private taskConfigService: TasksConfigService,
    public dialog: MatDialog,
    ) { 
      this.paramSubscription = route.params.subscribe(params=>console.log(params['id']));
      taskConfigService.getConfig("simple").subscribe(s=>{
        this.currentDataService.Config = s;
        this.processNewConfig();
      });
  }

  processNewConfig(){
    var config = this.currentDataService.Config;
    this.sqlText = config.initialJoinSQL;
  }
  

  ngOnInit(): void {  
  }
    
  ngOnDestroy():any{
    this.paramSubscription.unsubscribe();
  }

  showSQL():void{
    let sqlWithXlsxNames = this.sqlText;
    let config = this.currentDataService.Config;
    config.tableMapping.forEach((s,i)=>{
      let regEx = new RegExp(`${s.table}`, "ig");
      sqlWithXlsxNames = sqlWithXlsxNames.replace(regEx, `XLSX(\"assets/csv/${s.sheet}\",  {headers:true})`);
      }
    )
    console.log("Real SQL query: ", sqlWithXlsxNames);
    let self = this;
    alasql.default.promise(sqlWithXlsxNames)    
    .then(function(data){
      self.currentDataService.Data=data;
    }).catch(function(err){
      self.currentDataService.setErrorState(err);      
      console.log(self.currentDataService.resultError);
    });
  }

  showSolutionSQL(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "You will get complete SQL and will lost an opportunity to solve it all by yourself. Ok?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sqlText = this.currentDataService.Config.solutionSQL;
      }
    });
  }

  
}
