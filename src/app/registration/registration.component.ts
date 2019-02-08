import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.css'] // same forms, same style
})
export class RegistrationComponent implements OnInit {

  @ViewChild('name') nameEl: ElementRef;
  @ViewChild('email') emailEl: ElementRef;
  @ViewChild('password') passwordEl: ElementRef;
  @ViewChild('passwordConfirm') passwordConfirmEl: ElementRef;

  regForm: FormGroup;
  errorMsg: string;
  emailErrMsg: string;
  passwordConfMsg: string;
  submitted: boolean = false;
  loading: boolean = false;
  showNameError: boolean = false;
  showEmailError: boolean = false;
  showPasswordError: boolean = false;
  showPasswordConfError: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.regForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.email, Validators.required ]),
      password: new FormControl('', [ Validators.minLength(5), Validators.required ]),
      passwordConfirm: new FormControl('', [ Validators.minLength(5), Validators.required ])
    });
  }

  get formControls() { return this.regForm.controls; }

  private onFormInvalid() {
    // name control error check
    if (this.formControls.name.invalid) {
      this.nameEl.nativeElement.setAttribute('aria-describedby', 'nameError');
      this.showNameError = true;
    } else {
      this.showNameError = false;
    }

    // email control error check
    if (this.formControls.email.invalid) {
      this.emailEl.nativeElement.setAttribute('aria-describedby', 'emailError');
      this.showEmailError = true;
      if (this.formControls.email.errors.required) {
        this.emailErrMsg = 'Email is required.';
      } else {
        this.emailErrMsg = 'Invalid email format.';
      }
    } else {
      this.showEmailError = false;
    }

    // password control error check
    if (this.formControls.password.invalid) {
      this.passwordEl.nativeElement.setAttribute('aria-describedby', 'passwordError');
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
    }

    // password confirm control error check
    if (this.formControls.passwordConfirm.invalid) {
      this.passwordConfirmEl.nativeElement.setAttribute('aria-describedby', 'passwordConfirmError');
      this.showPasswordConfError = true;
      this.passwordConfMsg = 'Password must contain at least 5 characters.';
    } else {
      this.showPasswordConfError = false;
    }

    // set focus on first invalid form control
    if (this.formControls.name.invalid) {
      this.nameEl.nativeElement.focus();
    } else if (this.formControls.email.invalid) {
      this.emailEl.nativeElement.focus();
    } else if (this.formControls.password.invalid) {
      this.passwordEl.nativeElement.focus();
    } else {
      this.passwordConfirmEl.nativeElement.focus();
    }
  }

  private onFormValid() {
    this.nameEl.nativeElement.removeAttribute('aria-describedby');
    this.emailEl.nativeElement.removeAttribute('aria-describedby');
    this.passwordEl.nativeElement.removeAttribute('aria-describedby');
    this.passwordConfirmEl.nativeElement.removeAttribute('aria-describedby');
    this.showNameError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showPasswordConfError = false;
  }

  private passwordsMatch(): boolean {
    return this.formControls.password.value === this.formControls.passwordConfirm.value;
  }

  private sendRegRequest() {
    const user: User = {
      name: this.formControls.name.value,
      email: this.formControls.email.value,
      password: this.formControls.password.value
    }

    this.userService.register(user)
      .subscribe(
        resp => this.sendLoginRequest(),
        err => {
          if (err.status === 400) {
            this.errorMsg = 'User with this e-mail is already registred.';
            this.emailEl.nativeElement.focus();
          } else {
            this.errorMsg = 'The remote server is not responding.';
          }

          this.submitted = false;
          this.loading = false;
        }
      );
  }

  private sendLoginRequest() {
    this.authService.login(this.formControls.email.value, this.formControls.password.value)
      .subscribe(
        // user logged in, navigate to default route
        token => this.router.navigate(['/']),
        // login error, navigate to login for login user through that component
        err => this.router.navigate(['/login'])
      );
  }

  onRegistration() {
    // reset form states
    this.submitted = true;
    this.errorMsg = '';

    // check form valid
    if (this.regForm.invalid) {
      this.onFormInvalid();
      return;
    } else if (this.passwordsMatch()) {
      this.onFormValid();
    } else {
      this.passwordConfMsg = 'Passwords don\'t match.';
      this.showPasswordError = false; // show error only on confirm password input
      this.showPasswordConfError = true;
      return;
    }

    this.loading = true;
    this.sendRegRequest();
  }

}
