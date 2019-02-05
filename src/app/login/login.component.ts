import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from '../_services/auth.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('email') emailEl: ElementRef;
  @ViewChild('password') passwordEl: ElementRef;

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

  get formControls() { return this.loginForm.controls; }

  onLogin() {
    // reset form states
    this.submitted = true;
    this.errorMsg = '';

    // form is not valid, stop here
    if (this.loginForm.invalid) {
      if (this.formControls.email.invalid) {
        this.emailEl.nativeElement.focus();
      } else {
        this.passwordEl.nativeElement.focus();
      }

      return;
    }

    this.loading = true;
    this.authService.login(this.formControls.email.value, this.formControls.password.value)
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
          
          this.emailEl.nativeElement.focus();

          this.submitted = false;
          this.loading = false;
        }
    );
  }

}
