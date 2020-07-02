import { Routes } from "@angular/router";
import { QuizComponent } from '../component/quiz/quiz.component';
import { LessonComponent } from '../component/lesson/lesson.component';
import { ManageQuizComponent } from '../component/manage-quiz/manage-quiz.component';
import { ManageLessonComponent } from '../component/manage-lesson/manage-lesson.component';
import { EditQuizComponent } from '../component/edit-quiz/edit-quiz.component';
import { EditLessonComponent } from '../component/edit-lesson/edit-lesson.component';
import { LoginComponent } from '../component/login/login.component';
import { AppComponent } from '../app.component';
import {  GuardGuard } from '../services/auth.guard';
import { QuickbootComponent } from '../component/quickboot/quickboot.component';
import { FeedbackComponent } from '../component/feedback/feedback.component';

export const appRoutes:Routes=[
    // {path:"",component:LoginComponent},
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path:'login',component: LoginComponent},
    { path:'chatBoot',component: QuickbootComponent},

    {path:"quiz",component:AppComponent,children:[{
        path:'',component:QuizComponent,canActivate: [GuardGuard]
    }]},
    {path:"lesson",component:AppComponent,children:[{
        path:'',component:LessonComponent,canActivate: [GuardGuard]
    }]},
    {path:"manageQuiz",component:AppComponent,children:[{
        path:'',component:ManageQuizComponent,canActivate: [GuardGuard]
    }]},
    {path:"edit-quiz/:id",component:AppComponent,children:[{
        path:'',component:EditQuizComponent,canActivate: [GuardGuard]
    }]},
        {path:"edit-lesson/:id",component:AppComponent,children:[{
        path:'',component:EditLessonComponent,canActivate: [GuardGuard]
    }]},
     {path:"manageLesson",component:AppComponent,children:[{
        path:'',component:ManageLessonComponent,canActivate: [GuardGuard]
    }]},
     {path:"quizFeedback",component:AppComponent,children:[{
        path:'',component:FeedbackComponent,canActivate: [GuardGuard]
    }]},

    // {path:"quiz",component:QuizComponent},
    // {path:"lesson",component:LessonComponent},
    // {path:"manageQuiz",component:ManageQuizComponent},
    // {path:"edit-quiz/:id",component:EditQuizComponent},
    // {path:"edit-lesson/:id",component:EditLessonComponent},
    // {path:"manageLesson",component:ManageLessonComponent},
]