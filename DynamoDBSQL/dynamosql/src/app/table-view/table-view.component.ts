import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  constructor() { }
  @Input()
  public content: Array<any>;
  ngOnInit(): void {
  }

  getColumns():Array<string> {
    let columns:Array<string>=[];
    if(!this.content) return columns;
    Object.keys(this.content[0]).forEach(key=>{
      columns.push(key);
    });
    return columns;
  }

}
