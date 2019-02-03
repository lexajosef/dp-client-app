import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.email, Validators.required ]),
      password: new FormControl('', [ Validators.minLength(5), Validators.required ])
    });
  }

  get formControls() { return this.loginForm.controls}

  onLogin() {
    this.authService.login("lexa@gmail.com", "12345")
      .subscribe(res => {
        if (res) {
          // todo: navigate to home component
          
        } else {
          // todo show login errors
          
        }
      }
    );
  }

}
