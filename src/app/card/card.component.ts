import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../_models/post';
import { Router } from '@angular/router';

import * as KeyCodes from 'keycode-js';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  post: Post;

  constructor(private router: Router) { }

  ngOnInit() { }

  redirectToPost(event: any, postId: number) {
    // Note: KeyCodes.KEY_RETURN === ENTER key
    if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === KeyCodes.KEY_RETURN)) {
      if (event.ctrlKey) {
        window.open(`${window.location.origin}/post/${postId}`);
        return;
      }

      this.router.navigate([`/post/${postId}`]);
    }
  }

}
