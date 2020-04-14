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

  public current: Word;
  public variant: string;
  verbs:Word[]
  

  constructor(private verbsService: VerbsService,
    private snackBar: MatSnackBar
  ) {
    var verbs = this.verbsService.getVerbs();
    verbs.subscribe(s => {
      this.verbs = s;
      this.current = s.find((w, i) => {
        return w.is_irregular
          && w.start_idx > 0
      });
    });
  }

  ngOnInit() {  
  }

  checkWord() {
    var v = this.variant.trim().toLowerCase();
    var c = this.current.word.trim().toLowerCase();
    if (v == c) {
      this.snackBar.open("That's correct!", "Close", {
        duration: 1000,
      });
    }
    else {
      this.snackBar.open("No it's wrong! Correct answer: '" + c +"'.", "Close", {
        duration: 3000,
      });
    }
    this.current = this.verbs[201];
  }

}
