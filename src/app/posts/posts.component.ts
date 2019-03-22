import { Component, OnInit } from '@angular/core';
import * as KEYCODES from 'keycode-js';

import { Post } from '../_models/post';
import { PostsService } from '../_services/posts.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css', '../card/card.component.css', '../home/home.component.css']
})
export class PostsComponent implements OnInit {

  allUserPosts: Post[];
  postsToView: Post[];

  postToViewCount: number = 12;
  
  constructor(
    private authService: AuthService,
    private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts(true);
  }

  getPosts(orderDesc: boolean) {
    this.postsService.getAllWithoutUserId(this.authService.getUserTokenPayload().id, orderDesc)
      .subscribe(posts => {
        this.allUserPosts = posts;
        this.postsToView = this.allUserPosts.slice(0, this.postToViewCount);
      });
  }

  orderUsersPosts(desc: boolean) {
    this.getPosts(desc);
  }

  showMorePosts(ev: any) {
    if (ev.type === 'click' || (ev.type === 'keydown' && ev.keyCode === KEYCODES.KEY_RETURN)) {
      if (this.allUserPosts.length > this.postsToView.length) {
        this.postsToView = this.allUserPosts.slice(0, this.postsToView.length + this.postToViewCount);
      }
    }
  }

}
