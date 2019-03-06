import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';
import { Router } from '@angular/router';

import * as KeyCodes from 'keycode-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  userPosts: Post[];
  latestPosts: Post[];

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router) { }

  ngOnInit() {
    this.userName = this.authService.getUserTokenPayload().name;
    this.getUserPosts();
    this.getLatestPosts();
  }

  getUserPosts() {
    this.postsService.getAllByUserId(this.authService.getUserTokenPayload().id)
      .subscribe(posts => this.userPosts = posts);
  }

  getLatestPosts() {
    this.postsService.getLatestPosts(6, 0)
      .subscribe(posts => this.latestPosts = posts);
  }

  redirectToPost(event: any, postId: number) {
    if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === KeyCodes.KEY_RETURN)) { // KEY_RETURN === ENTER key
      if (event.ctrlKey) {
        window.open(`${window.location.origin}/post/${postId}`);
        return;
      }

      this.router.navigate([`/post/`, postId]);
    }
  }

}
