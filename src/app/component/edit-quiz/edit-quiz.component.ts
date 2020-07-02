import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Quiz } from 'src/app/services/quiz/quiz.model';
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  quizData: Quiz;
  correctoption = "^[A-D]";

  constructor(public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router ) { }

  ngOnInit() {
    this.updateQuiz();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getQuiz(id);
    this.editForm = this.formBuilder.group({
      question: ['', Validators.required],
      options: this.formBuilder.group({
        optionA: ['', Validators.required],
        optionB: ['', Validators.required],
        optionC: [''],
        optionD: ['']
      }),
      correctoption: ['', [Validators.required, Validators.pattern(this.correctoption)]],
      status:['',Validators.required]

    })
  }
  getQuiz(id: any) {
    this.quizService.getQuizById(id).subscribe(data => {
      console.log(data);
      console.log(data.question);
      this.editForm.setValue({
        question: data['question'],
        options: data['options'],
        correctoption: data['correctoption'],
        status:data['status']
      });
    });
  }
   // Getter to access form control
   get f() {
    return this.editForm.controls;
  }
  updateQuiz() {
    this.editForm = this.formBuilder.group({
      question: ['', Validators.required],
      options: this.formBuilder.group({
        optionA: ['', Validators.required],
        optionB: ['', Validators.required],
        optionC: ['', Validators.required],
        optionD: ['']
      }),
      correctoption: ['', [Validators.required, Validators.pattern(this.correctoption)]],
      status:['',Validators.required]
    })
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.quizService.updateQuiz(id, this.editForm.value)
          .subscribe(res => {
            alert('Quiz Updated Successfully')
            this.router.navigateByUrl('/manageQuiz');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}

