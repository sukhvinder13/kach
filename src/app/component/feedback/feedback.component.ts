import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackData:any=[];
  p:any;
  constructor(private feedback: FeedbackService) { }

  ngOnInit() {
    this.getFeedback();
  }

  getFeedback(){
    this.feedback.getFeedbackData().subscribe((data)=>{
      this.feedbackData=data;
      console.log(data);
    })
  }

}
