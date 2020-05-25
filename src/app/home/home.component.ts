import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService:DataService) { }

  quizes = [];
  subscription:Subscription



  ngOnInit() {
    this.dataService.fetchData("flags");
    this.quizes = this.dataService.getQuizes();
    

  }


}


