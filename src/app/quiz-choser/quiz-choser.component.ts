import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-choser',
  templateUrl: './quiz-choser.component.html',
  styleUrls: ['./quiz-choser.component.css']
})
export class QuizChoserComponent implements OnInit {
  quizType:string;
  startSentence:string

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {

    this.quizType = this.route.snapshot.queryParams['quizType'];
    

    if(this.quizType === 'capitals') {
      this.startSentence = "Answer what is the capital of";
    }
    if(this.quizType === 'borders') {
      this.startSentence = "Answer what are the borders of"
    }
    if(this.quizType === 'flags') {
      this.startSentence = "Answer what is the flag of"
    }
    if(this.quizType === 'regions') {
      this.startSentence = "Answer what is the region of"
    }


  }

}
