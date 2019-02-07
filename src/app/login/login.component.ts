import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('email') emailEl: ElementRef;
  @ViewChild('password') passwordEl: ElementRef;

  loginForm: FormGroup;
  returnUrl: string;
  errorMsg: string;
  loading: boolean = false;
  submitted = false;

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

  private onFormInvalid() {
    if (this.formControls.email.invalid) {
      this.emailEl.nativeElement.setAttribute('aria-describedby', 'emailError');
    } 
    if (this.formControls.password.invalid) {
      this.passwordEl.nativeElement.setAttribute('aria-describedby', 'pwError');
    }

    // set focus back to the login form
    this.formControls.email.invalid ? 
      this.emailEl.nativeElement.focus() :
      this.passwordEl.nativeElement.focus();
  }

  private onFormValid() {
    this.emailEl.nativeElement.removeAttribute('aria-describedby');
    this.passwordEl.nativeElement.removeAttribute('aria-describedby');
  }

  onLogin() {
    // reset form states
    this.submitted = true;
    this.errorMsg = '';

    // form is not valid, stop here
    if (this.loginForm.invalid) {
      this.onFormInvalid();
      return;
    } else {
      this.onFormValid();
    }

    // send login to auth service
    this.loading = true;
    this.authService.login(this.formControls.email.value, this.formControls.password.value)
      .subscribe(
        token => {
          // successfully login, navigate to app
          this.router.navigate([this.returnUrl]);
        },
        err => {
          if (err.status === 400) {
            this.errorMsg = 'Invalid email or password.';
            this.emailEl.nativeElement.focus();
          } else {
            this.errorMsg = 'The remote server is not responding.';
          }
          
          this.submitted = false;
          this.loading = false;
        }
    );
  }

}
