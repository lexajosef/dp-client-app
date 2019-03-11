import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';

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
    private postsService: PostsService) { }

  ngOnInit() {
    this.userName = this.authService.getUserTokenPayload().name;
    this.getUserPosts();
    this.getLatestPosts();
  }

  getUserPosts() {
    this.postsService.getAllByUserId(this.authService.getUserTokenPayload().id, true)
      .subscribe(posts => this.userPosts = posts);
  }

  getLatestPosts() {
    this.postsService.getLatestPosts(6, 0)
      .subscribe(posts => this.latestPosts = posts);
  }

}
