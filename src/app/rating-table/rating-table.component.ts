import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-rating-table',
  templateUrl: './rating-table.component.html',
  styleUrls: ['./rating-table.component.css']
})
export class RatingTableComponent implements OnInit {

  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router) { }

  quizType:string
  recordsArray = [];

  ngOnInit() {

    this.quizType = this.route.snapshot.queryParams['quizType'];

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
  }

  goBack() {
    this.router.navigate(['/quiz-choser'], {queryParams: {quizType:this.quizType}})
  }

}
