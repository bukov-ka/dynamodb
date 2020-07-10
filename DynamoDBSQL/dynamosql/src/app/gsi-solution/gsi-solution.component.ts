import { Component, OnInit } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';
import * as alasql from 'alasql';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gsi-solution',
  templateUrl: './gsi-solution.component.html',
  styleUrls: ['./gsi-solution.component.scss']
})
export class GsiSolutionComponent implements OnInit {

  primaryKey: string;
  sortKey: string = "";
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
  updateSubscription: Subscription;

  constructor(public currentDataService: CurrentDataService) { 
    this.updateSubscription = currentDataService.columnsUpdated.subscribe((m: Array<any>)=>{
      if(m == null)
      {
        this.primaryKey="";
        this.sortKey="";
      }
      else
      {
        this.primaryKey=currentDataService.columns[0];
        this.sortKey="";
      }
    });
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy():any{
    this.updateSubscription.unsubscribe();
  }

  runQuery(){
    let self = this;    
    let topExpression = this.limit?`top ${this.limit}`:"";
    let descendingExpression = this.descending?'desc':'asc'    
    let orderByExpression = this.sortKey?
                            `order by ${this.sortKey} ${descendingExpression}, ${this.primaryKey}`
                            :`order by ${this.primaryKey}`;    
    let sortKeyQuoted = this.sortKeyValue;
    if(this.currentDataService.Data.length>0 && !this.operator.includes('LIKE'))
    {
      sortKeyQuoted = typeof(this.currentDataService.Data[0][this.sortKey])=='string'
                      ?`\"${this.sortKeyValue}\"`:this.sortKeyValue;
    }
    console.log(sortKeyQuoted);
    let sortKeyExpression = `${this.sortKey} ${this.operator}`.replace(/val/gi, sortKeyQuoted);
    console.log(this.operator);
    console.log(sortKeyExpression);
    let whereExpression = this.sortKey?
    `where  ${this.primaryKey} = \"${this.primaryKeyValue}\" AND ${sortKeyExpression}`
    :`where  ${this.primaryKey} = \"${this.primaryKeyValue}\"`;
    let selectExpression = `select ${topExpression} * from ? data \
    ${whereExpression} \
    ${orderByExpression} `;
    console.log(selectExpression);
    alasql.default.promise(selectExpression, [this.currentDataService.Data])    
    .then(function(data){
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
  }

}
