import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrls: ['./start-modal.component.css']
})
export class StartModalComponent implements OnInit {


  ok;
  @Input() userAlert:string;
  @Input() quizType:string
  quitGameMode:boolean = false;
  constructor(private dataService:DataService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    if(this.userAlert === 'Are you sure u wanna quit the game?') {
      this.quitGameMode = true;
    }
  
  }

  oneMoreGameClicked()
  {
    this.ok = true;
    this.dataService.okButtonPerssedMethod();
    
  }
  quitChosed() {
    this.router.navigate([''])
  }

  continueChosed() {
    this.ok = true;
    this.dataService.gameContinueMethod();
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

  tableButtonClicked() {
    this.router.navigate(['rating-table'], {queryParams: {'quizType' : this.quizType}})
  }

}
