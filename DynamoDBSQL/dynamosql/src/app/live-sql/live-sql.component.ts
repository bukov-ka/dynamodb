import { Component, OnInit } from '@angular/core';
import * as alasql from 'alasql';

@Component({
  selector: 'app-live-sql',
  templateUrl: './live-sql.component.html',
  styleUrls: ['./live-sql.component.scss']
})
export class LiveSqlComponent implements OnInit {

  sqlText:string = "SELECT * FROM Table";
  constructor() { 
  }

  ngOnInit(): void {
  }
  
  showSQL():void{
    //alasql(this.sqlText);
    console.log(this.sqlText);    
    alasql.default("CREATE TABLE music (Artist STRING, SongTitle STRING, AlbumTitle STRING, Year INT, Price MONEY)");
    alasql.default("INSERT INTO music(Artist,SongTitle,AlbumTitle,Year,Price,Genre) VALUES('No One You Know','Call Me Today','Somewhat Famous',2015,2.14,'Country')");
    alasql.default("INSERT INTO music(Artist,SongTitle,AlbumTitle,Year,Price,Genre) VALUES('No One You Know','Call Me Tomorrow','Somewhat Famous',2015,3,'Country')");
    alasql.default("INSERT INTO music(Artist,SongTitle,AlbumTitle,Year,Price,Genre) VALUES('No One You Know','Don\\'t call us, we\\'ll call you','Somewhat Famous',2015,4,'Country')");
    var res = alasql.default('select Artist, SongTitle from (SELECT * FROM music)');
    //console.log(alasql);
    //console.log(res);
    console.table(res);
    alasql.default.promise('SELECT * FROM CSV("assets/csv/music.csv", {headers:true})')
    .then(function(data){
      console.log('It works! I think...');
         console.log(data);
    }).catch(function(err){
         console.log('Error:', err);
    });
  }
}
