import { Component, OnInit, Input } from '@angular/core';
import { CurrentDataService } from '../services/current-data.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  constructor(private currentDataService: CurrentDataService) { }
  @Input()
  public content: Array<any>;
  ngOnInit(): void {
  }

  getColumns(): Array<string> {
    return this.currentDataService.getColumns(this.content);
  }

}
