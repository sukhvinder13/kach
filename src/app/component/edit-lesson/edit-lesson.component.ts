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
  responseDataYes:Array<any>
  responseDataNo:Array<any>

  constructor(public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router) { }

  ngOnInit() {
    this.updateLesson();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getLesson(id);
    this.editForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      audioFilePath: [null, Validators.required],
      summary: ['', Validators.required],
      challange: ['', Validators.required],
      // yes: ['', Validators.required],
      // no: ['', Validators.required],
      status: ['', Validators.required],
      responseYes: this.formBuilder.array([
        this.initResponseYes(),
      ]),
      responseNo: this.formBuilder.array([
        this.initResponseNo(),
      ])

    });
  }
  getLesson(id: any) {
    this.lessonService.getLessonById(id).subscribe(data => {
      console.log(data);
      this.responseDataYes=data['responseYes'];
      this.responseDataNo=data['responseNo'];
      this.editForm.patchValue({
        // audioFilePath: data['audioFilePath'],
        summary: data['summary'],
        lessonName: data['lessonName'],
        challange: data['challange'],
        // response: data['response'],
        status: data['status'],
      });
      this.audiofilepath=data.audioFilePath;
      // console.log(data.response);
      // console.log(this.setResponse(data.response));
    this.editForm.setControl('responseYes',this.setResponseYes(this.responseDataYes));
    this.editForm.setControl('responseNo',this.setResponseNo(this.responseDataNo));
    });
  }
  setResponseYes(responseSetYes):FormArray{
    const formArray=new FormArray([]);
    responseSetYes.forEach(s=>{
      formArray.push(this.formBuilder.group({
        yes:s.yes,
        // no : s.no
      }))
    })
    return formArray;
  } 
  setResponseNo(responseSetNo):FormArray{
    const formArray=new FormArray([]);
    responseSetNo.forEach(s=>{
      formArray.push(this.formBuilder.group({
        // yes:s.yes,
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
        lessonName: ['', Validators.required],
        summary: ['', Validators.required],
        challange: ['', Validators.required],
        // yes: ['', Validators.required],
        // no: ['', Validators.required],
        status:  ['', Validators.required],
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
      yes: ['', Validators.required],
      // no: ['', Validators.required]
    })
  }
  initResponseNo() {
    return this.formBuilder.group({
      // yes: ['', Validators.required],
      no: ['', Validators.required]
    })
  }
  addResponseYes() {
    // add address to the list
    const control = <FormArray>this.editForm.get('responseYes');
    control.push(this.initResponseYes());
  }
  addResponseNo() {
    // add address to the list
    const control = <FormArray>this.editForm.get('responseNo');
    control.push(this.initResponseNo());
  }

  removeResponseYes(i: number) {
    // remove address from the list
    const control = <FormArray>this.editForm.get('responseYes');
    control.removeAt(i);
  }
  removeResponseNo(i: number) {
    // remove address from the list
    const control = <FormArray>this.editForm.get('responseNo');
    control.removeAt(i);
  }
  //file upload
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onSubmit() {
        //fileupload 
        if(name==null){
          alert('Please select audio file')
        }
        let formData = new FormData();
        formData.append('audioFilePath', this.selectedFile, this.selectedFile.name);
         for (let key in this.editForm.value) 
         { 
           if(key=='responseYes'){
             this.editForm.value[key] = JSON.stringify(this.editForm.value[key])
           }
           if(key=='responseNo'){
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
