import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-manage-lesson',
  templateUrl: './manage-lesson.component.html',
  styleUrls: ['./manage-lesson.component.css']
})
export class ManageLessonComponent implements OnInit {
  lessonData:any = [];
   p:any;
  constructor(private lessonService:LessonService) { 
    this.readlessonData();
  }

  ngOnInit() {
  }
  //get data
readlessonData(){
  this.lessonService.getLessonData().subscribe((data) => {
   this.lessonData = data;
   console.log(data);
  })   
}
removelessonData(data,index) {
  if(window.confirm('Are you sure?')) {
      this.lessonService.deleteLesson(data._id).subscribe((data) => {
        this.lessonData.posts.splice(index, 1);
      }
    )    
  }
}

}
