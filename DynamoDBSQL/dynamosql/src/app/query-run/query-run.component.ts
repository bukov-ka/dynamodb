import { Component, OnInit, Input } from '@angular/core';
import * as alasql from 'alasql';
import { CurrentDataService } from '../services/current-data.service';

@Component({
  selector: 'app-query-run',
  templateUrl: './query-run.component.html',
  styleUrls: ['./query-run.component.scss']
})
export class QueryRunComponent implements OnInit {

  @Input() primaryKey: string;
  @Input() sortKey: string;

  resultError: string = null;  
  resultKey: string = "";
  primaryKeyValue:string = "";
  sortKeyValue:string = "";
  descending: boolean = false;
  operator: string = "=val";
  limit: string = "";    
  limitOptions: {val:string, title:string}[]=[
    {"val":"", "title":"None"},
    {"val":"1", "title":"1"},
    {"val":"3", "title":"3"},
    {"val":"10", "title":"10"},
  ];
  
  constructor(public currentDataService: CurrentDataService) { }

  ngOnInit(): void {
  }

  checkNullPrimaryKey(){
    for (let index = 0; index < this.currentDataService.Data.length; index++) {
      const element = this.currentDataService.Data[index];
      if(element[this.primaryKey] == undefined || element[this.primaryKey] == ''){
        this.resultError='Primary Key cannot contain nulls.';        
        throw new Error(this.resultError);
      }
    }
  }

  // Put quotes around string value
  quoteValue(val:any, column:string): string {
    var result = typeof(this.currentDataService.Data[0][column])=='string'
    ?`\"${val}\"`:val;
    return result;
  }

  runQuery(){
    this.resultError=null;
    try
    {
      this.checkNullPrimaryKey();
    }
    catch
    {
      console.log(this.resultError);
      return;
    }
    let self = this; 
    let topExpression = this.limit?`top ${this.limit}`:"";
    let descendingExpression = this.descending?'desc':'asc'    
    let orderByExpression = this.sortKey?
                            `order by ${this.sortKey} ${descendingExpression}, ${this.primaryKey}`
                            :`order by ${this.primaryKey}`;    
    let sortKeyQuoted = this.sortKeyValue;
    if(this.currentDataService.Data.length>0 && !this.operator.includes('LIKE'))
    {
      sortKeyQuoted = this.quoteValue(this.sortKeyValue, this.sortKey);
    }
    let primaryKeyValueQuoted = this.quoteValue(this.primaryKeyValue, this.primaryKey);
    let sortKeyExpression = `${this.sortKey} ${this.operator}`.replace(/val/gi, sortKeyQuoted);
    let whereExpression = this.sortKey?
    `where  ${this.primaryKey} = ${primaryKeyValueQuoted} AND ${sortKeyExpression}`
    :`where  ${this.primaryKey} = ${primaryKeyValueQuoted}`;
    let selectExpression = `select ${topExpression} * from ? data \
    ${whereExpression} \
    ${orderByExpression} `;
    alasql.default.promise(selectExpression, [this.currentDataService.Data])    
    .then(function(data){      
      console.log(data);
    }).catch(function(err){
      this.resultError=err;
      console.log(err);
    });
  }
}