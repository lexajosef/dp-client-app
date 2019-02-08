import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';}
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
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
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
    // set described by error
    if (this.formControls.name.invalid) {
      this.nameEl.nativeElement.setAttribute('aria-describedby', 'nameError');
    }
    if (this.formControls.email.invalid) {
      this.emailEl.nativeElement.setAttribute('aria-describedby', 'emailError');
    }
    if (this.formControls.password.invalid) {
      this.passwordEl.nativeElement.setAttribute('aria-describedby', 'passwordError');
    }
    if (this.formControls.passwordConfirm.invalid) {
      this.passwordConfirmEl.nativeElement.setAttribute('aria-describedby', 'passwordConfirmError');
    }

    // TODO: set focus in form
  }

  private onFormValid() {
    this.nameEl.nativeElement.removeAttribute('aria-describedby');
    this.emailEl.nativeElement.removeAttribute('aria-describedby');
    this.passwordEl.nativeElement.removeAttribute('aria-describedby');
    this.passwordConfirmEl.nativeElement.removeAttribute('aria-describedby');
  }

  private sendRegRequest() {
    const user: User = {
      name: this.formControls.name.value,
      email: this.formControls.email.value,
      password: this.formControls.password.value
    }

    this.userService.register(user)
      .subscribe(
        resp => {
          console.log(resp);
          // TODO: login user and redirect to app component
        },
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

  onRegistration() {
    // reset form states
    this.submitted = true;
    this.errorMsg = '';

    // check form valid
    if (this.regForm.invalid) {
      this.onFormInvalid();
      return;
    } else {
      this.onFormValid();
    }

    this.loading = true;
    this.sendRegRequest();
  }

}
