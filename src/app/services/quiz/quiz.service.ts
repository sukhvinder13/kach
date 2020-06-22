import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // baseUri:string = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createQuiz(data): Observable<any> {
    // let url = `${this.baseUri}/addquiz`;
    return this.http.post( environment.baseUrl + '/addquiz', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // get all quiz
  getQuizData() {
    return this.http.get(environment.baseUrl + '/readQuiz');
  }
   // Get employee
   getQuizById(id): Observable<any> {
    // let url = `${this.baseUri}/read/${id}`;
    return this.http.get(environment.baseUrl + `/readQuiz/${id}`, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Update employee
  updateQuiz(id, data): Observable<any> {
    // let url = `${this.baseUri}/update/${id}`;
    return this.http.put(environment.baseUrl + `/updateQuiz/${id}`, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteQuiz(id:string): Observable<any> {
    // let url = `${this.baseUri}/delete/${id}`;
    console.log(id);
    return this.http.delete(environment.baseUrl + `/deleteQuiz/${id}`, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
