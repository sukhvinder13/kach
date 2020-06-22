import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators ,FormArray} from "@angular/forms";
import { Lesson } from 'src/app/services/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';
@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  lessonData:Lesson[];
  selectedFile: File = null;
  audiofilepath:string;
  responseData:Array<any>

  constructor(public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router) { }

  ngOnInit() {
    this.updateLesson();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getLesson(id);
    this.editForm = this.formBuilder.group({
      audioFilePath: [null, Validators.required],
      summary: ['', Validators.required],
      challange: ['', Validators.required],
      // yes: ['', Validators.required],
      // no: ['', Validators.required],
      status: ['', Validators.required],
      response: this.formBuilder.array([
        this.initResponse(),
      ])

    });
  }
  getLesson(id: any) {
    this.lessonService.getLessonById(id).subscribe(data => {
      console.log(data);
      this.responseData=data['response'];
      this.editForm.patchValue({
        // audioFilePath: data['audioFilePath'],
        summary: data['summary'],
        challange: data['challange'],
        // response: data['response'],
        status: data['status'],
      });
      this.audiofilepath=data.audioFilePath;
      console.log(data.response);
      console.log(this.setResponse(data.response));
    this.editForm.setControl('response',this.setResponse(this.responseData));
    });
  }
  setResponse(responseSet):FormArray{
    const formArray=new FormArray([]);
    responseSet.forEach(s=>{
      formArray.push(this.formBuilder.group({
        yes:s.yes,
        no : s.no
      }))
    })
    return formArray;
  }
   // Getter to access form control
   get f() {
    return this.editForm.controls;
  }
    updateLesson() {
      this.editForm = this.formBuilder.group({
        audioFilePath: ['', Validators.required],
        summary: ['', Validators.required],
        challange: ['', Validators.required],
        // yes: ['', Validators.required],
        // no: ['', Validators.required],
        status:  ['', Validators.required],
        response: this.formBuilder.array([
          this.initResponse(),
        ])
  
      });
  }
  initResponse():FormGroup {
    return this.formBuilder.group({
      yes: ['', Validators.required],
      no: ['', Validators.required]
    })
  }
  addResponse() {
    // add address to the list
    const control = <FormArray>this.editForm.get('response');
    control.push(this.initResponse());
  }

  removeResponse(i: number) {
    // remove address from the list
    const control = <FormArray>this.editForm.get('response');
    control.removeAt(i);
  }
  //file upload
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onSubmit() {
        //fileupload 
        let formData = new FormData();
        formData.append('audioFilePath', this.selectedFile, this.selectedFile.name);
         for (let key in this.editForm.value) 
         { 
           if(key=='response'){
             this.editForm.value[key] = JSON.stringify(this.editForm.value[key])
           }
           // console.log(key,this.editForm.value[key]);
           formData.append(key, this.editForm.value[key]);
           // console.log(key);
          }
       // stop here if form is invalid
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.lessonService.updateLesson(id, this.editForm.value)
          .subscribe(res => {
            alert('Lesson Updated Successfully')
            this.router.navigateByUrl('/manageLesson');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
