import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css']
})
export class ManageQuizComponent implements OnInit {
  QuizData:any = [];
  p:any;
  constructor(private formBuilder: FormBuilder,
    private quizService: QuizService) {
      this.readQuizData();
     }

  ngOnInit() {
  }
//get data
readQuizData(){
  this.quizService.getQuizData().subscribe((data) => {
   this.QuizData = data;
   console.log(data);
  })   
}
removeQuizData(data,index) {
  if(window.confirm('Are you sure?')) {
      this.quizService.deleteQuiz(data._id).subscribe((data) => {
        this.QuizData.posts.splice(index, 1);
        console.log(data);
      }
    )    
  }
}
}