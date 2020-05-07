import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) { }

  quizes = [];
  subscription:Subscription
  flagsPath1 = [];
  flagsPath2 = [];


  ngOnInit() {
    this.dataService.fetchData("flags");
    this.quizes = this.dataService.getQuizes();
    

   
    this.subscription = this.dataService.fetchDone.subscribe(
      (premission: boolean) => {
        
        this.flagsPath1 = this.dataService.getFlagsPath(50)
        this.flagsPath2 = this.dataService.getFlagsPath(50)
      });
      }
      ngOnDestroy() {
        this.subscription.unsubscribe();
      }
}


