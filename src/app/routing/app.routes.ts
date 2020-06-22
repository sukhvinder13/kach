import { Routes } from "@angular/router";
import { QuizComponent } from '../component/quiz/quiz.component';
import { LessonComponent } from '../component/lesson/lesson.component';
import { ManageQuizComponent } from '../component/manage-quiz/manage-quiz.component';
import { ManageLessonComponent } from '../component/manage-lesson/manage-lesson.component';
import { EditQuizComponent } from '../component/edit-quiz/edit-quiz.component';
import { EditLessonComponent } from '../component/edit-lesson/edit-lesson.component';
import { LoginComponent } from '../component/login/login.component';
import { AppComponent } from '../app.component';

export const appRoutes:Routes=[
    // {path:"",component:LoginComponent},
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path:'login',component: LoginComponent},
    {path:"quiz",component:AppComponent,children:[{
        path:'',component:QuizComponent
    }]},
    {path:"lesson",component:AppComponent,children:[{
        path:'',component:LessonComponent
    }]},
    {path:"manageQuiz",component:AppComponent,children:[{
        path:'',component:ManageQuizComponent
    }]},
    {path:"edit-quiz/:id",component:AppComponent,children:[{
        path:'',component:EditQuizComponent
    }]},
        {path:"edit-lesson/:id",component:AppComponent,children:[{
        path:'',component:EditLessonComponent
    }]},
     {path:"manageLesson",component:AppComponent,children:[{
        path:'',component:ManageLessonComponent
    }]},

    // {path:"quiz",component:QuizComponent},
    // {path:"lesson",component:LessonComponent},
    // {path:"manageQuiz",component:ManageQuizComponent},
    // {path:"edit-quiz/:id",component:EditQuizComponent},
    // {path:"edit-lesson/:id",component:EditLessonComponent},
    // {path:"manageLesson",component:ManageLessonComponent},
]