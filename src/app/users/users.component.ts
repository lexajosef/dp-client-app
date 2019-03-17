import { Component, OnInit } from '@angular/core';
import * as KEYCODES from 'keycode-js';

import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../home/home.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      users => {
        const userId = this.authService.getUserTokenPayload().id;
        this.users = users.filter(user => user.id !== userId);
      }
    );
  }

  redirectToUser(ev: any, userId: number) {
    // Note: KEYCODES.KEY_RETURN === ENTER key
    if (ev.type === 'click' || (ev.type === 'keydown' && ev.keyCode === KEYCODES.KEY_RETURN)) {
      if (ev.ctrlKey) {
        window.open(`${window.location.origin}/user/${userId}`);
        return;
      }

      this.router.navigate([`/user/${userId}`]);
    }
  }
}
