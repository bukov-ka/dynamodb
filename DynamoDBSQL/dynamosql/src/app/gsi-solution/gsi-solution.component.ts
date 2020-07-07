import { Component, OnInit } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';

@Component({
  selector: 'app-gsi-solution',
  templateUrl: './gsi-solution.component.html',
  styleUrls: ['./gsi-solution.component.scss']
})
export class GsiSolutionComponent implements OnInit {

  constructor(private currentDataService: CurrentDataService) { 
    console.log(this.currentDataService.Data);
  }

  ngOnInit(): void {
  }

}
