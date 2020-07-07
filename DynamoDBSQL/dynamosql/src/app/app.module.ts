import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiveSqlComponent } from './live-sql/live-sql.component';
import { TableViewComponent } from './table-view/table-view.component';
import { GsiSolutionComponent } from './gsi-solution/gsi-solution.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveSqlComponent,
    TableViewComponent,
    GsiSolutionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
