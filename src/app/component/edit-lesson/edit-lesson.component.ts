import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Lesson } from 'src/app/services/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  lessonData: Lesson[];
  selectedFile: File = null;
  audiofilepath: string;
  responseDataYes: Array<any>;
  responseDataNo: Array<any>;
  isLoading = false;
  statusArray:any=[];
  lessonData1:any=[];
  constructor(public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
    this.updateLesson();
    this.getLessondata();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getLesson(id);
    this.editForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      audioFilePath: [''],
      summary: ['', Validators.required],
      challange: ['', Validators.required],
      sequenceNo: ['', Validators.required],
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
   //get lessom=n
   getLessondata(){
    this.lessonService.getLessonData().subscribe((data)=>{
      this.lessonData1=data['posts'];
    let id = this.actRoute.snapshot.paramMap.get('id');
      // console.log(this.lessonData1);
      for(let i=0;i<=this.lessonData1.length;i++){
        if(id != this.lessonData1[i]._id){
          this.statusArray.push(this.lessonData1[i].sequenceNo);
        }
      }
    })
  }
  getLesson(id: any) {
    this.lessonService.getLessonById(id).subscribe(data => {
      // console.log(data);
      this.responseDataYes = data['responseYes'];
      this.responseDataNo = data['responseNo'];
      this.editForm.patchValue({
        summary: data['summary'],
        lessonName: data['lessonName'],
        challange: data['challange'],
      sequenceNo:data['sequenceNo'],
        status: data['status'],
      });
      this.audiofilepath = data.audioFilePath;
      this.editForm.setControl('responseYes', this.setResponseYes(this.responseDataYes));
      this.editForm.setControl('responseNo', this.setResponseNo(this.responseDataNo));
    });
  }
 // check seq no
 checkSequenceNo(){
  this.editForm.value.sequenceNo;
  console.log(this.statusArray);
  for(let i=0;i<this.statusArray.length;i++){
    if(this.editForm.value.sequenceNo==this.statusArray[i]){
      alert('Sequence No  '+ this.editForm.value.sequenceNo +' already exist please enter another sequence');
    }
  }
}

  setResponseYes(responseSetYes): FormArray {
    const formArray = new FormArray([]);
    responseSetYes.forEach(s => {
      formArray.push(this.formBuilder.group({
        yes: s.yes,
        // no : s.no
      }))
    })
    return formArray;
  }
  setResponseNo(responseSetNo): FormArray {
    const formArray = new FormArray([]);
    responseSetNo.forEach(s => {
      formArray.push(this.formBuilder.group({
        // yes:s.yes,
        no: s.no
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
      audioFilePath: [''],
      lessonName: ['', Validators.required],
      summary: ['', Validators.required],
      challange: ['', Validators.required],
      sequenceNo: ['', Validators.required],
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
    if (name == null) {
      alert('Please select audio file')
    }
    let formData = new FormData();
    if (this.selectedFile) {
      formData.append('audioFilePath', this.selectedFile, this.selectedFile.name);
    }else{
      formData.append('audioFilePath', 'null');
    }
    
    for (let key in this.editForm.value) {
            
      if (key == 'responseYes') {
        this.editForm.value[key] = JSON.stringify(this.editForm.value[key])
      }
      if (key == 'responseNo') {
        this.editForm.value[key] = JSON.stringify(this.editForm.value[key])
      }
      if(key=='audioFilePath'){
        console.log('leave it');
      }else{
        formData.append(key, this.editForm.value[key]);
      }
      // console.log(key,this.editForm.value[key]);
      
      // console.log(key);
    }
    // stop here if form is invalid
    this.submitted = true;
    if (!this.editForm.valid) {
      console.log('not created');
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.isLoading = true;
        this.lessonService.updateLesson(id, formData)
          .subscribe(res => {
            alert('Lesson Updated Successfully');
            this.isLoading = false;
            this.router.navigateByUrl('/manageLesson');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
//text editor
config: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '15rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  defaultParagraphSeparator: 'p',
  defaultFontName: 'Arial',
  toolbarHiddenButtons: [
    ['superscript','link','unlink','insertImage','insertVideo',
    'insertHorizontalRule','justifyLeft','justifyCenter','justifyRight',
    'justifyFull','indent',
  'outdent','strikeThrough','subscript','foregroundColorPicker','backgroundColorPicker' ]
    ],
  customClasses: [
    {
      name: "quote",
      class: "quote",
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1",
    },
  ]
};

}
