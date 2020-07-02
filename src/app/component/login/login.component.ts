import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails: FormGroup;
  isSubmitted:false;
  constructor(private _formbuilder: FormBuilder,
    private _service: ApiService,
    private router: Router,
    private location:Location) { }

  ngOnInit() {
    this.loginDetails = this._formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get formControls() { return this.loginDetails.controls; }

  onSubmit() {
  isSubmitted:true;
    if (this.loginDetails.invalid) {
      alert('Please Fill the Mandatory Fields');
    } else {
      this._service.loginUser(this.loginDetails.value).subscribe(token=>{
        // console.log(token);

        if(token){
          // console.log('success');
          // console.log(token);
          localStorage.setItem('token',token.token);
          localStorage.setItem('userInfo',JSON.stringify(token.data));
          this.router.navigate(['/manageQuiz'])
  
        }else{
          // console.log('message');
          alert(token.message);
        }
      }, error => {
        // console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 500) {
            alert('Sorry!! You are not authorized for this Action');
            this.router.navigate(['/401'])
          } else {
            let errMesage="An unknown errr";
            if(error.error.message){
              errMesage=error.error.message
            }
            alert(errMesage)
            // alert('internal error occured')
          }
        } else {
          alert('internal error occured without any http error');
        }
      })
    }
  }

}