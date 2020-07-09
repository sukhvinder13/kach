import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing/app.routes';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './component/quiz/quiz.component';
import { LessonComponent } from './component/lesson/lesson.component'
import { HttpClientModule } from '@angular/common/http';
import { ManageQuizComponent } from './component/manage-quiz/manage-quiz.component';
import { ManageLessonComponent } from './component/manage-lesson/manage-lesson.component';
import { EditQuizComponent } from './component/edit-quiz/edit-quiz.component';
import { EditLessonComponent } from './component/edit-lesson/edit-lesson.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { QuickbootComponent } from './component/quickboot/quickboot.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SafeHtmlPipe } from './services/pipe.safepipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    LessonComponent,
    ManageQuizComponent,
    ManageLessonComponent,
    EditQuizComponent,
    EditLessonComponent,
    LoginComponent,
    DashboardComponent,
    QuickbootComponent,
    FeedbackComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    AngularEditorModule,
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
