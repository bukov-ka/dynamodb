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
}
