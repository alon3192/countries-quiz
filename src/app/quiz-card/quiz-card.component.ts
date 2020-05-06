import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {
  @Input () quizType:string;
  recordsArray = [];

  constructor(private dataService:DataService, private http:HttpClient, private router:Router) { }

  ngOnInit() {

    this.http.get("https://quiz-9855b.firebaseio.com/" + this.quizType + ".json").
    subscribe(responseData=> {
      
     
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          
          this.recordsArray.push({... responseData[key]});
        }
      }
      this.sortArrayRecoreds();
    })
  }

  sortArrayRecoreds() {
    var tmp;
    for(let i=0 ; i < this.recordsArray.length-1 ; i++) {
      for(let j=i+1 ; j < this.recordsArray.length ; j++) {
        if(this.recordsArray[i].record < this.recordsArray[j].record) { 
          tmp = this.recordsArray[i];
          this.recordsArray[i] = this.recordsArray[j];
          this.recordsArray[j] = tmp;
        }
      }
    }
    this.recordsArray = this.recordsArray.slice(0,3);
  }
  tableButtonClicked() {
    this.router.navigate(['rating-table'], {queryParams: {'quizType' : this.quizType}})
  }
  quizChosed() {
    this.router.navigate(['/quiz-choser'], {queryParams: {quizType:this.quizType}})
  }
}
