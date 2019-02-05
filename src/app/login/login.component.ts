import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string = '/'; // '/' is a default route 
  loading: boolean = false;
  submitted = false;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.email, Validators.required ]),
      password: new FormControl('', [ Validators.minLength(5), Validators.required ])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl']  || '/';
  }

  get form() { return this.loginForm.controls; }

  onLogin() {
    // reset form states
    this.submitted = true;
    this.errorMsg = '';
    this.loading = true;

    // form is not valid, stop here
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.form.email.value, this.form.password.value)
      .subscribe(
        token => {
          // successfully login, navigate to app
          this.router.navigate([this.returnUrl]);
        },
        err => {
          if (err.status === 400) {
            this.errorMsg = 'Chybné přihlašovací údaje.';
          } else {
            this.errorMsg = 'Vzdálený server neodpovídá.';
          }
          this.submitted = false;
          this.loading = false;
        }
    );
  }

}
