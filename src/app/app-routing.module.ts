import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveSqlComponent } from './live-sql/live-sql.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:id', component: LiveSqlComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
