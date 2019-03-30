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
  @Input('postId') postId: number;

  @ViewChild('newCommentText') newCommentText: ElementRef;

  showCommentBtns: boolean = false;
  createCommentBtnDisabled: boolean = true;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() { }

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
    this.commentsService.create(this.postId, { text: this.newCommentText.nativeElement.value })
      .subscribe(comment => this.comments.unshift(comment));
  }

}
