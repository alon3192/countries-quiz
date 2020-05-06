import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form-records',
  templateUrl: './form-records.component.html',
  styleUrls: ['./form-records.component.css']
})
export class FormRecordsComponent implements OnInit {

  @Input() quizType:string;
  username:string;
  @Input() record:string;
  detailsRecord;

  constructor(private dataService:DataService) { }
  ok;

  ngOnInit() {
  }

  onSubmit(form:NgForm) {


    this.username = form.value.username; 
    if(this.username === '' || typeof(this.username) === 'undefined') {
      document.getElementById("username").style.border = "red 1px solid";
    }
    else {
      let currentDate = new Date();
      
      let dateString = currentDate.getDate() + "/" +  (currentDate.getUTCMonth() + 1) + "/" + currentDate.getUTCFullYear()
      this.detailsRecord = {name: form.value.username, record:this.record, date:dateString}
      this.dataService.newRecored(this.detailsRecord, this.quizType)  /*write to db*/ 
      this.buttonClicked();
    }

  }

  buttonClicked() {
    this.ok = true;
    this.dataService.readyModalShowMethod();
  }

 

  hasPushed()
  {
    if(this.ok)
    {
      return "toast_press_ok";
    }
  }
  enableScreen()
  {
    if(this.ok)
    {
      return "enable_screen";
    }  
  }

}
