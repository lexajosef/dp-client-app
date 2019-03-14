import { Component, OnInit } from '@angular/core';
import * as KEYCODES from 'keycode-js';

import { AuthService } from '../_services/auth.service';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../card/card.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  allUserPosts: Post[];
  postsToView: Post[];
  latestPosts: Post[];

  postToViewCount: number = 6;

  constructor(
    private authService: AuthService,
    private postsService: PostsService) { }

  ngOnInit() {
    this.userName = this.authService.getUserTokenPayload().name;
    this.getUserPosts(true);
    this.getLatestPosts();
  }

  getUserPosts(orderDesc: boolean) {
    this.postsService.getAllByUserId(this.authService.getUserTokenPayload().id, orderDesc)
      .subscribe(posts => {
        this.allUserPosts = posts;
        this.postsToView = this.allUserPosts.slice(0, this.postToViewCount);
      });
  }

  getLatestPosts() {
    this.postsService.getLatestPosts(this.postToViewCount, 0)
      .subscribe(posts => this.latestPosts = posts);
  }

  orderUserPosts(desc: boolean) {
    this.getUserPosts(desc);
  }
  
  showMorePosts(ev: any) {
    if (ev.type === 'click' || (ev.type === 'keydown' && ev.keyCode === KEYCODES.KEY_RETURN)) {
      if (this.allUserPosts.length > this.postsToView.length) {
        this.postsToView = this.allUserPosts.slice(0, this.postsToView.length + this.postToViewCount);
      }
    }
  }
}
