import { Component, OnInit, Input } from '@angular/core';
import * as alasql from 'alasql';
import { CurrentDataService } from '../services/current-data.service';
import { RunConfig } from '../shared/run_config';
import { element } from 'protractor';

@Component({
  selector: 'app-query-run',
  templateUrl: './query-run.component.html',
  styleUrls: ['./query-run.component.scss']
})
export class QueryRunComponent implements OnInit {

  @Input() primaryKey: string;
  @Input() sortKey: string;
  @Input()
  public runConfig: RunConfig;

  resultError: string = null;
  resultKey: string = "";
  primaryKeyValue: string = "";
  sortKeyValue: string = "";
  descending: boolean = false;
  operator: string = "=val";
  limit: string = "";
  limitOptions: { val: string, title: string }[] = [
    { "val": "", "title": "None" },
    { "val": "1", "title": "1" },
    { "val": "3", "title": "3" },
    { "val": "10", "title": "10" },
  ];
  success: boolean;
  expectedResult: string; // What we expect from the run
  actualResult: string; // What we got from the run
  _solutionRequested: boolean;
  get SolutionRequested(): boolean {
    return this._solutionRequested;
  }
  @Input()
  set SolutionRequested(solution: boolean) {
    this._solutionRequested = solution;
    if (solution) {
      this.primaryKeyValue = this.runConfig.solutionKeyValues.primaryKeyValue;
      this.sortKeyValue = this.runConfig.solutionKeyValues.sortKeyValue;
      this.descending = this.runConfig.solutionKeyValues.descending;
      this.descending = this.runConfig.solutionKeyValues.descending;
      this.operator = this.runConfig.solutionKeyValues.operator;
      this.limit = this.runConfig.solutionKeyValues.limit.toString();
      this.resultKey = this.runConfig.solutionKeyValues.resultKey;
    }
  }
  constructor(public currentDataService: CurrentDataService) { }

  ngOnInit(): void {
  }

  // Put quotes around string values
  quoteValue(val: any, column: string): string {
    var result = typeof (val) == 'string'
      ? `\"${val}\"` : val;
    return result;
  }

  runQuery() {
    this.resultError = null;
    let self = this;
    let topExpression = this.limit ? `top ${this.limit}` : "";
    let descendingExpression = this.descending ? 'desc' : 'asc'
    let orderByExpression = this.sortKey ?
      `order by ${this.sortKey} ${descendingExpression}, ${this.primaryKey}`
      : `order by ${this.primaryKey}`;
    let sortKeyQuoted = this.sortKeyValue;
    if (this.currentDataService.Data.length > 0 && (!this.sortKey == undefined || this.operator == undefined || !this.operator.includes('LIKE'))) {
      sortKeyQuoted = this.quoteValue(this.sortKeyValue, this.sortKey);
    }
    let primaryKeyValueQuoted = this.quoteValue(this.primaryKeyValue, this.primaryKey);
    let sortKeyExpression = `${this.sortKey} ${this.operator}`.replace(/val/gi, sortKeyQuoted);
    let whereExpression = this.sortKey ?
      `where  ${this.primaryKey} = ${primaryKeyValueQuoted} AND ${sortKeyExpression}`
      : `where  ${this.primaryKey} = ${primaryKeyValueQuoted}`;
    let selectExpression = `select ${topExpression} * from ? data \
    ${whereExpression} \
    ${orderByExpression} `;
    alasql.default.promise(selectExpression, [this.currentDataService.Data])
      .then(function (data) {
        var res = [];
        data.forEach(element => {
          res.push(element[self.resultKey]);
        });
        if (JSON.stringify(res) == JSON.stringify(self.runConfig.result)) {
          self.success = true;
        }
        else {
          self.success = false;
          self.expectedResult = JSON.stringify(self.runConfig.result);
          self.actualResult = JSON.stringify(res);
        }
      }).catch(function (err) {
        self.resultError = err;
        console.error(err);
      });
  }
}
