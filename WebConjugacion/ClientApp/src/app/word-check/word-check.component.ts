import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { VerbsService } from '../services/verbs.service';
import { Word } from '../shared/models/word';
import { Mood } from '../shared/models/mood';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TensesService } from '../services/tenses.service';

@Component({
  selector: 'app-word-check',
  templateUrl: './word-check.component.html',
  styleUrls: ['./word-check.component.css']
})
export class WordCheckComponent implements OnInit {
  @ViewChild('varianInput', { static: false }) variantInput: ElementRef;

  public get current(): Word {
    if (!this.verbs) return undefined;
    return this.verbs[this.currentIndex];
  }
  public get currentTenseName(): string {
    return this.tenses[this.current.tense_key];
  }
  currentIndex: number;
  public variant: string;
  verbs: Word[];
  tenses: object;
  showRightAnswer: boolean = false;

  constructor(private verbsService: VerbsService,
    private tenseService: TensesService,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.refreshVerbsList();
    tenseService.getTenses().subscribe(s => {
      this.tenses = s;
      //let t = s.flatMap(mood => mood.exact_tenses
      //  .map(m => {
      //    return {
      //      name: mood.name + ' ' + m.name, key = m.exact_name}
      //  }));
      let flatTensesList = s.map(mood => mood.exact_tenses
        .map(m => {
          return {
            name: mood.name + ' ' + m.name, key: m.exact_name
          }
        }))
        .reduce(function (a, b) { return a.concat(b); });

      flatTensesList.forEach(f => {
        this.tenses[f.key] = f.name;
      });
    });    
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
    let v = (this.variant||"").trim().toLowerCase();
    let c = this.current.word.trim().toLowerCase();
    let correctAnswers = c.split(",");
    let correct = correctAnswers.indexOf(v) > -1;
    this.variant = ""; // Clear the input
    if (correct) {
      this.current["correct"] = true;
      this.snackBar.open("That's correct!", "Close", {
        duration: 1000,
      });
    }
    else {
      this.current["correct"] = false;
      this.showRightAnswer = true;
      let barRef = this.snackBar.open("No it's wrong! Correct answer: '" + c +"'.", "Close", {
        duration: 3000,
      });
      barRef.afterDismissed().subscribe(s => {
        this.showRightAnswer = false;
        this.changeDetectorRef.detectChanges();
        (this.variantInput.nativeElement as HTMLInputElement).focus();
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
