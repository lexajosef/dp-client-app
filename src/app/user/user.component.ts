import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as KEYCODES from 'keycode-js';

import { UserService } from '../_services/user.service';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';
import { User } from '../_models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../home/home.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  
  userId: number;
  postToViewCount = 12;
  actUser: User;
  allUserPosts: Post[];
  postsToView: Post[];

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId']; // (+) convert string 'postId' to a number
      this.getUser();
      this.getUserPosts(true);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUser() {
    this.usersService.getById(this.userId)
      .subscribe(user => {
        this.actUser = user;
      });
  }

  getUserPosts(orderDesc: boolean) {
    this.postsService.getAllByUserId(this.userId, orderDesc)
      .subscribe(posts => {
        this.allUserPosts = posts;
        this.postsToView = this.allUserPosts.slice(0, this.postToViewCount);
      });
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
