import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL :any="";

  constructor(
    private http:HttpClient
  ) {
    this.baseURL = environment.baseUrl;
   }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getUserInfo(parm1){
    if(!localStorage.getItem('userInfo'))
      return false;
    else
      return JSON.parse(localStorage.getItem('userInfo'))[parm1];
  }

  getToken(){
    return localStorage.getItem('token');
  }

  registerUser(userDetails){
    return this.http.post<any>(this.baseURL+'/i/user/registration',userDetails);
  }

  loginUser(loginDetails){
    return this.http.post<any>(this.baseURL+'/user/login',loginDetails);
  }

  findUsers(){
    return this.http.get<any>(this.baseURL+'/r/users');
  }
  
  addBatch(batchDetails){
    return this.http.post<any>(this.baseURL+'/i/batch',batchDetails);
  }
  
  findAllBatches(){
    return this.http.get<any>(this.baseURL+'/r/batches');
  }


}