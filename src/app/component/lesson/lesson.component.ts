import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  selectedFile: File = null;
  addLesson: FormGroup;
  submitted = false;
  isLoading=false;
  status: any = [{ "value": "Yes", "key": "1" }, { "value": "No", "key": "0" }]
  constructor(private formBuilder: FormBuilder,
    private LessonService: LessonService,
    private router:Router) { }

  ngOnInit() {
    this.isLoading=false;
    this.addLesson = this.formBuilder.group({
      lessonName: ['',Validators.required],
      audioFilePath: ['', Validators.required],
      summary: ['', Validators.required],
      challange: ['', Validators.required],
      sequenceNo: ['', Validators.required],
      status: [1],
      responseYes: this.formBuilder.array([
        this.initResponseYes(),
      ]),
      responseNo: this.formBuilder.array([
        this.initResponseNo(),
      ])


    });
  }
  initResponseYes() {
    return this.formBuilder.group({
      yes: [''],
      // no: ['', Validators.required]
    })
  }
  initResponseNo() {
    return this.formBuilder.group({
      // yes: ['', Validators.required],
      no: ['']
    })
  }
  addResponseYes() {
    // add address to the list
    const control = <FormArray>this.addLesson.get('responseYes');
    control.push(this.initResponseYes());
  }
  addResponseNo() {
    // add address to the list
    const control = <FormArray>this.addLesson.get('responseNo');
    control.push(this.initResponseNo());
  }

  removeResponseYes(i: number) {
    // remove address from the list
    const control = <FormArray>this.addLesson.get('responseNO');
    control.removeAt(i);
  }
  removeResponseNo(i: number) {
    // remove address from the list
    const control = <FormArray>this.addLesson.get('responseNO');
    control.removeAt(i);
  }
  //file upload
  onFileSelected(event) {
    // console.log(event);
    console.log( this.selectedFile);

    this.selectedFile = <File>event.target.files[0];
    console.log( this.selectedFile);

  }

  get f() { return this.addLesson.controls; }
  changeStatus(e) {
    // console.log(e.value)
    this.status.setValue(e.target.value, {
      onlySelf: true
    })
  }
  onSubmit() {
    this.submitted = true;
    //fileupload 
    let formData = new FormData();
    console.log( this.selectedFile);
     formData.append('audioFilePath', this.selectedFile, this.selectedFile.name);
      for (let key in this.addLesson.value) 
      { 
        if(key=='responseYes'){
          this.addLesson.value[key] = JSON.stringify(this.addLesson.value[key])
        }
        if(key=='responseNo'){
          this.addLesson.value[key] = JSON.stringify(this.addLesson.value[key])
        }
        // console.log(key,this.addLesson.value[key]);
        formData.append(key, this.addLesson.value[key]);
        // console.log(key);
       }
    // stop here if form is invalid
    if (!this.addLesson.valid) {
      console.log('Lesson not created!');
      alert('Please Insert required fields');
      return false;
    } else {
      console.log(this.addLesson.value);
      console.log(formData);
      this.isLoading=true;
      this.LessonService.createLesson(formData).subscribe(
        (res) => {
          alert('SUCCESS!! Lesson Saved SuccessFully');
          this.isLoading=false;
          // this.addLesson.reset();
          this.ngOnInit();
          this.router.navigateByUrl('/lesson');
        }, (error) => {
          console.log(error);
        });
    }
  }
}
