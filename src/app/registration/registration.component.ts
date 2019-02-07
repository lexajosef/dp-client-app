import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
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

  }

  private onFormValid() {

  }

  private sendRegRequest() {
    let user: User = {
      name: this.formControls.name.value,
      email: this.formControls.email.value,
      password: this.formControls.password.value
    }

    this.userService.register(user)
      .subscribe(
        user => {
          console.log(user);
          // TODO: show success message and redirect link to login
        },
        error => console.log(error)
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

    // send registration request
    this.sendRegRequest();
  }

}
