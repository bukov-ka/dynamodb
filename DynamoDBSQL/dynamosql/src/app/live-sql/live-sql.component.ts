import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksConfigService } from '../services/tasks-config.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import alasql from 'alasql';


@Component({
  selector: 'app-live-sql',
  templateUrl: './live-sql.component.html',
  styleUrls: ['./live-sql.component.scss'],
  providers: [CurrentDataService]
})
export class LiveSqlComponent implements OnInit {

  sqlText: string;
  solutionRequested: boolean;

  private paramSubscription: Subscription;
  constructor(public currentDataService: CurrentDataService,
    private route: ActivatedRoute,
    private taskConfigService: TasksConfigService,
    public dialog: MatDialog,
  ) {
    this.paramSubscription = route.params.subscribe(params => {
      var itemId = params['id'];
      var items = ["", "simple", "one-to-many"];
      taskConfigService.getConfig(items[itemId]).subscribe(config => {
        this.currentDataService.Config = config;
        this.processNewConfig();
      });
    });

  }

  processNewConfig() {
    var config = this.currentDataService.Config;
    this.sqlText = config.initialJoinSQL;
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): any {
    this.paramSubscription.unsubscribe();
  }

  showSQL(): void {

    let config = this.currentDataService.Config;
    let xlsxFile = config.xlsxFile;
    var tableCreationPromises = [];
    config.tableMapping.forEach((tableMappings, i) => { // Select all the tables in the database
      let tableSelect = `select * from XLSX(\"assets/csv/${xlsxFile}\",  {sheetid:'${tableMappings.sheet}',headers:true});`;
      tableCreationPromises.push(
        alasql.promise(tableSelect).then(tableData => {
          alasql(`DROP TABLE IF EXISTS ${tableMappings.table}`);
          alasql(`CREATE TABLE ${tableMappings.table}`);
          alasql(`SELECT * INTO ${tableMappings.table} FROM ?`, [tableData]);
        })
          .catch(function (err) {
            // Here we can't get any user errors. Only internal errors are possible
            console.error(err);
          })
      );
    });

    // Wait for all the tables created
    Promise.all(tableCreationPromises).then(() =>
      this.ProcessSelectWithUnions(this.sqlText)
    );

  }

  private ProcessSelectWithUnions(userSQL: string) {
    let unionReplaceRegEx = new RegExp(`(union all|union)`, "ig");
    var splittedSQL = userSQL.replace(unionReplaceRegEx, '@').split('@'); // split the query by any 'union' clause    
    let self = this;
    var promises = [];
    var res = [];
    splittedSQL.forEach(s => {
      promises.push(alasql.promise(s)
        .then(function (data) {
          data.forEach((row) => res.push(row)); // Push each row to the resulting table
          self.currentDataService.Data = data;
        }).catch(function (err) {
          self.currentDataService.setErrorState(err);
          console.error(self.currentDataService.resultError);
        }));
    });
    Promise.all(promises).then(() => self.currentDataService.Data = res);
  }

  showSolutionSQL() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "You will get complete SQL and will lost an opportunity to solve it all by yourself. Ok?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sqlText = this.currentDataService.Config.solutionSQL;
        this.solutionRequested = false; // Reset the value to rerun the fields update
        setTimeout(() => {
          this.solutionRequested = true;
        }, 0);
      }
    });
  }


}
