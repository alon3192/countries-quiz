import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  question:string;
  answer:string;
  questionAndAnswer;
  optionalChoices = [];
  subscription:Subscription
  score:number = 0;
  counterOfQuestions:number = 0;
  @Input() quizType:string;
  @Input() startSentence:string

  minutes;
  seconds;
  timeLeft:number = 4 * 60;
  intervel;
  startModalMode:boolean = true;
  recordModalMode:boolean = false;
  flagsFlag:boolean = false;
  questionFlag:string;
  userChosedMode:boolean = false;

  userAlert:string = "Ready to start the Quiz?";

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.minutes = "04"
    this.seconds = "00"
    if(this.quizType === 'flags') {
      this.flagsFlag = true;
    }
    this.dataService.fetchData(this.quizType);
    
  

        this.subscription = this.dataService.okButtonPressed.subscribe(
          (premission: boolean) => {
            setTimeout(()=>{    
              document.getElementById("time").classList.add("time");
              this.startModalMode = false;
              this.score = 0;
              this.counterOfQuestions = 0;
              this.minutes = "04";
              this.seconds = "00";
              this.timeLeft = 4 * 60;
              clearInterval(this.intervel) 
              this.countdownBegin();
              this.nextQuestion();
            }, 1000);
            
          });

           this.subscription = this.dataService.readyModalShow.subscribe(
        (premission: boolean) => {
          setTimeout(()=>{    
            this.recordModalMode = false;
          }, 1000);
          setTimeout(()=>{    
            this.startModalMode = true;
          }, 1500);
          
          
        });

        this.subscription = this.dataService.gameContinue.subscribe(
          (premission: boolean) => {
            setTimeout(()=>{    
              this.startModalMode = false;

            }, 1000);
            
          });
      
  }

  countdownBegin() {
    this.intervel = setInterval(() => {
      if(this.timeLeft > 0) {
          this.timeLeft--;
          
          this.seconds = Number.parseInt("" + this.timeLeft % 60);
        if(this.seconds < 10) {
          this.seconds = "0" + this.seconds;
        }
        this.minutes = Number.parseInt("" + this.timeLeft / 60);

        if(this.minutes < 10) {
          this.minutes = "0" + this.minutes;
        }
      }
      else {
        this.timeLeft = 0;
        this.roundOver();
      }
    }, 1000)
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  nextQuestion() {
    this.questionAndAnswer = this.dataService.getQuestionAndAnswer(this.quizType);
    this.question = this.questionAndAnswer[0];
    this.questionFlag = "../../assets/images/flags/" + (this.question) + ".png"
    this.answer = this.questionAndAnswer[1]; 
    this.optionalChoices = this.dataService.getWrongAnswers(this.quizType);
    this.optionalChoices.push(this.answer);
    this.shuffle(this.optionalChoices);
    this.counterOfQuestions++;
    if(document.getElementById("option") !== null) {
      document.getElementById("option").classList.remove('correct_answer')
    } 
    this.userChosedMode = false;
  }

  defineWidthButtonByTextLength(option) {
    let sum = 0
    for(let i=0 ; i<option.length ; i++) {
      sum+=option[i].length;
    }
    if(sum > 60) {
      return 'big_length2';
    }
    
    if(sum > 30) {
      return 'big_length1';
    }
    
  }

  optionChosed(option:string, index:number) {
    this.userChosedMode = true;
    
  let rightIndex = 0;
    for(let i=0 ; i<this.optionalChoices.length ; i++) {
      if(this.optionalChoices[i] === this.answer) {
        rightIndex = i;
        break;
      }
    }

    if(option === this.answer) {
      this.score++;
      document.getElementsByClassName("option")[rightIndex].className += ' correct_answer';
    }
    else {
      document.getElementsByClassName("option")[index].className += ' wrong_answer';
      document.getElementsByClassName("option")[rightIndex].className += ' show_correct_answer';
    }

    setTimeout(()=>{    
      this.nextQuestion();
        if(this.counterOfQuestions > 50) {
          this.roundOver();
        }
    }, 1000);
        
  }

  roundOver() {
    this.userAlert = "Do u wanna play another round?"
    this.recordModalMode = true;
    clearInterval(this.intervel);
  }
  quitOfQuiz() {
    this.userAlert = "Are you sure u wanna quit the game?"
    this.startModalMode = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
