import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiveSqlComponent } from './live-sql/live-sql.component';
import { TableViewComponent } from './table-view/table-view.component';
import { GsiSolutionComponent } from './gsi-solution/gsi-solution.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { QueryRunComponent } from './query-run/query-run.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import 'alasql';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    LiveSqlComponent,
    TableViewComponent,
    GsiSolutionComponent,
    NavMenuComponent,
    QueryRunComponent,
    ConfirmationDialogComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
