import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  correctoption = "^[A-D]";
  // QuizData:any = [];

  addQuiz: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private quizService: QuizService) {
      // this.readQuizData();
     }

  ngOnInit() {
    this.addQuiz = this.formBuilder.group({
      question: ['', Validators.required],
      options: this.formBuilder.group({
        optionA: ['', Validators.required],
        optionB: ['', Validators.required],
        optionC: [''],
        optionD: ['' ]
      }),
      correctoption: ['', [Validators.required,Validators.pattern(this.correctoption)]],
      status:['1']
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.addQuiz.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.addQuiz.valid) {
      console.log('Quiz not created!')

      return false;
    } else {
      console.log(this.addQuiz.value);
      this.quizService.createQuiz(this.addQuiz.value).subscribe(
        (res) => {
          console.log('Quiz successfully created!')
          // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
          alert('We added the question successfully. If you want to upload on the mobile application then go to List of the Questions section.')
          this.addQuiz.reset(this.addQuiz.value);
        // this.addQuiz.reset();
        }, (error) => {
          console.log(error);
        });
    }
  }
//get data
// readQuizData(){
//   this.quizService.getQuizData().subscribe((data) => {
//    this.QuizData.posts = data;
//    console.log(data);
//   })    
// }

}
