import { Component, OnInit  } from '@angular/core';
import { VerbsService } from '../services/verbs.service';
import { Word } from '../shared/models/word';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-word-check',
  templateUrl: './word-check.component.html',
  styleUrls: ['./word-check.component.css']
})
export class WordCheckComponent implements OnInit {

  public get current(): Word {
    return this.verbs[this.currentIndex];
  }
  currentIndex: number;
  public variant: string;
  verbs: Word[]

  constructor(private verbsService: VerbsService,
    private snackBar: MatSnackBar
  ) {
    this.refreshVerbsList();
  }

  refreshVerbsList() {
    var verbsObs = this.verbsService.getVerbs();
    verbsObs.subscribe(s => {
      this.verbs = s;
      this.currentIndex = 0;
    });
  }

  ngOnInit() {  
  }

  checkWord() {
    var v = this.variant.trim().toLowerCase();
    var c = this.current.word.trim().toLowerCase();
    if (v == c) {
      this.current["correct"] = true;
      this.snackBar.open("That's correct!", "Close", {
        duration: 1000,
      });
    }
    else {
      this.current["correct"] = false;
      this.snackBar.open("No it's wrong! Correct answer: '" + c +"'.", "Close", {
        duration: 3000,
      });
    }
    if (this.currentIndex < this.verbs.length - 1) {
      this.currentIndex++;
    }
    else {
      this.refreshVerbsList();
    }
  }
}
