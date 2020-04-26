"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerbsService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var VerbsService = /** @class */ (function () {
    function VerbsService(http, tensesService) {
        this.http = http;
        this.tensesService = tensesService;
    }
    VerbsService.prototype.getVerbs = function () {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:44350',
                'Accept': 'application/json'
            })
        };
        // REST API
        return this.http.get('https://hi6s52i4xa.execute-api.eu-west-3.amazonaws.com/test/?input=gerund,pastParticiple', httpOptions);
        //HTTP API
        //return this.http.get<Word[]>('https://2y0wbgdgij.execute-api.eu-west-3.amazonaws.com/GetTenVerbs?input=gerund', httpOptions);
        /*var fTenses = this.tensesService.filterTenses;
        return this.http.get<Word[]>('allVerbsForm.json', httpOptions)
          .pipe(
            catchError(err => {
              return throwError(err);
              }
            )
          )
          .pipe(map((m) => {
            return m.map(mi => {
              return new Word(mi);
            })
              .filter(f => f.word.length > 1)
              .filter(f =>
                // Filter out unselected tenses
                fTenses == undefined || fTenses.length == 0 || fTenses.indexOf(f.tense_key) > -1
            )
            .sort(() => Math.random()-.5)
            .slice(0,10);
          }))
          ;*/
    };
    VerbsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VerbsService);
    return VerbsService;
}());
exports.VerbsService = VerbsService;
//# sourceMappingURL=verbs.service.js.map