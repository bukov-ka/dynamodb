import { Component, OnInit } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';
import * as alasql from 'alasql';

@Component({
  selector: 'app-gsi-solution',
  templateUrl: './gsi-solution.component.html',
  styleUrls: ['./gsi-solution.component.scss']
})
export class GsiSolutionComponent implements OnInit {

  primaryKey: string;
  sortKey: string = "";
  descending: boolean = false;
  operator: string = "";
  limit: string = "";    
  limitOptions: {val:string, title:string}[]=[
    {"val":"", "title":"None"},
    {"val":"1", "title":"1"},
    {"val":"3", "title":"3"},
    {"val":"10", "title":"10"},
  ];

  constructor(public currentDataService: CurrentDataService) { 
    currentDataService.columnsUpdated.subscribe((m: Array<any>)=>{
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

  runQuery(){
    console.log('----');    
    console.log(this.primaryKey);
    console.log(this.sortKey);
    console.log(this.operator);
    console.log(this.descending);
    console.log(this.limit);
    console.log('----');    
    let self = this;
    alasql.default.promise('select top 2 * from ? data', this.currentDataService.Data)    
    .then(function(data){
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
  }

}
