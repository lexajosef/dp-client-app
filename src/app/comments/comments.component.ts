import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Comment } from '../_models/comment';
import { CommentsService } from '../_services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('comments') comments: Comment[];
  @ViewChild('newCommentText') newCommentText: ElementRef;

  showCommentBtns: boolean = false;
  createCommentBtnDisabled: boolean = true;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    console.log(this.comments);
  }

  onCreateCommentFocus() {
    this.showCommentBtns = true;
  }

  hideCreateCommentBtns() {
    this.showCommentBtns = false;
  }

  onTextChange() {
    this.createCommentBtnDisabled = this.newCommentText.nativeElement.value.length < 1;
  }

  createComment() {

  }

}
