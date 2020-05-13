import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  countries = [];
  fetchDone = new Subject<boolean>()
  randomAnswerNumber:number
  okButtonPressed = new Subject<boolean>();
  readyModalShow = new Subject<boolean>();
  numberOfTheOptions:number = 250;
  gameContinue = new Subject<boolean>();
  quizes = ["capitals", "borders", "flags"];
  

  constructor(private http: HttpClient) {  }

  

  fetchData(quizType:string) {


    this.http.get<[]>('../assets/data/data-countries.json')
    .subscribe(data => {
      this.countries = data;
      if(quizType === "capitals") {
        this.countries = this.countries.filter(value => value.capital.length > 0) 
      }
      if(quizType === "borders") {
        this.countries = this.countries.filter(value => value.borders.length > 0) 
      }
    /*  if(quizType === "flags") {
        this.countries = this.countries.filter(value => value.name !=="Svalbard and Jan Mayen")
      }*/
      this.fetchDone.next(true); 
      this.numberOfTheOptions = this.countries.length;
    })
  }

  getQuestionAndAnswer(quizType:string) {
    let random = Math.floor(Math.random() * this.numberOfTheOptions); 
    this.randomAnswerNumber = random
    let questionAndAnswer = [];
  
    if(quizType === 'capitals') {
      questionAndAnswer.push(this.countries[random].name, this.countries[random].capital);
      return questionAndAnswer;
    }
    if(quizType === 'borders') {
      let borders = []
        questionAndAnswer.push(this.countries[random].name);
        for(let i=0 ; i< this.countries[random].borders.length ; i++) {
          borders.push(this.searchTheWholeWord(this.countries[random].borders[i]));
        }
        questionAndAnswer.push(borders)
        borders = [];

        return questionAndAnswer;
    }
    if(quizType === 'flags') {
        questionAndAnswer.push(this.countries[random].name, "../../assets/images/flags/" + (this.countries[random].name) + ".png");
        return questionAndAnswer; 
    } 

    if(quizType === 'regions') {
      questionAndAnswer.push(this.countries[random].name, this.countries[random].region);
      return questionAndAnswer; 
    }
  }
  searchTheWholeWord(shortWord:string) {

    let tmpCountries = this.countries.filter(value => value.alpha3Code === shortWord) 
    return tmpCountries[0].name
  }

  getWrongAnswers(quizType:string) {
    
    let wrongAnswers = [];
    let random1
    let random2
    let random3
    /*let numberOfTheOptions = this.numberOfTheOptions; 
    let regionsArray = ['Asia', 'Europe', 'Oceania', 'Africa', 'Americas']*/
    
    while(true) {
      random1 = Math.floor(Math.random() * this.numberOfTheOptions); 
      random2 = Math.floor(Math.random() * this.numberOfTheOptions); 
      random3 = Math.floor(Math.random() * this.numberOfTheOptions); 
      

      if(!(random1 === random2 || random1 === random3 || random2 === random3)) {
          if(!(random1 === this.randomAnswerNumber || random2 === this.randomAnswerNumber || random3 === this.randomAnswerNumber)) {

            if(quizType === 'capitals') {
              wrongAnswers.push(this.countries[random1].capital, this.countries[random2].capital, this.countries[random3].capital)
            }
            if(quizType === "borders") {
              let borders = [];
       
          for(let i=0 ; i< this.countries[random1].borders.length ; i++) {
            borders.push(this.searchTheWholeWord(this.countries[random1].borders[i]));
          }
          wrongAnswers.push(borders)
          borders = [];
       
          for(let i=0 ; i< this.countries[random2].borders.length ; i++) {
            borders.push(this.searchTheWholeWord(this.countries[random2].borders[i]));
          }
          wrongAnswers.push(borders)
          borders = [];
       
          for(let i=0 ; i< this.countries[random3].borders.length ; i++) {
            borders.push(this.searchTheWholeWord(this.countries[random3].borders[i]));
          }
          wrongAnswers.push(borders)
            }
            if(quizType === "flags") {
              wrongAnswers.push("../../assets/images/flags/" + (this.countries[random1].name)  + ".png", 
              "../../assets/images/flags/" + (this.countries[random2].name)  + ".png",
              "../../assets/images/flags/" + (this.countries[random3].name)  + ".png")
            }
            if(quizType === 'regions') {
              wrongAnswers.push(this.countries[random1].region, this.countries[random2].region, this.countries[random3].region)    
                } 
          }
          if(wrongAnswers.length === 3) {
            return wrongAnswers; 
          }     
        }     
      }
      

  }
  okButtonPerssedMethod() {
    this.okButtonPressed.next(true);
  }

  readyModalShowMethod() {
    this.readyModalShow.next(true);
  }
  gameContinueMethod() {
    this.gameContinue.next(true);
  }

  newRecored(detailsRecord, quizType) {
    this.http.post('https://quiz-9855b.firebaseio.com/' + quizType + '.json', detailsRecord).subscribe(
      responseData=>{
        
      }, error => {
        
      })
    }

    getQuizes() {
    return this.quizes;
    } 

    getFlagsPath(amount:number) {
      let countries = this.countries;
      let flagsPath = []
      let random;
      let imagePath;
      for(let i=0 ; i<amount ; i++) {
        random = Math.floor(Math.random() * this.numberOfTheOptions); 
        imagePath = "../../assets/images/flags/" + (countries[random].name)  + ".png";
        flagsPath.push(imagePath);  
      }
       return flagsPath;
    }
  }




