import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { RatingTableComponent } from './rating-table/rating-table.component';
import { QuizChoserComponent } from './quiz-choser/quiz-choser.component';


const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'quiz-choser', component:QuizChoserComponent },
  { path: 'rating-table', component:RatingTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
