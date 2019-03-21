import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @ViewChild('article') article: ElementRef;

  postId: number;
  post: Post;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.postId = +params['postId']; // (+) convert string 'postId' to a number
      this.getPost(this.postId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getPost(postId: number) {
    this.postService.getById(postId).subscribe(post => {
      this.post = post;
      this.generatePost();
    });
  }

  generatePost() {
    this.article.nativeElement.innerHTML = this.post.html;
  }

}
