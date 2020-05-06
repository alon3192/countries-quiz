import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StartModalComponent } from './start-modal/start-modal.component';
import { FormRecordsComponent } from './form-records/form-records.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RatingTableComponent } from './rating-table/rating-table.component';
import { QuizChoserComponent } from './quiz-choser/quiz-choser.component';
import { HomeImgComponent } from './home-img/home-img.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    HomeComponent,
    StartModalComponent,
    FormRecordsComponent,
    RatingTableComponent,
    QuizChoserComponent,
    HomeImgComponent,
    QuizCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
