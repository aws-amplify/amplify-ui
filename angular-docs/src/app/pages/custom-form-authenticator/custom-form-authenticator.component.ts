import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-form-authenticator',
  templateUrl: './custom-form-authenticator.component.html',
})
export class CustomFormAuthenticatorComponent implements OnInit {
  public signInValidators = {
    username: [Validators.minLength(4)],
  };

  public containsNumber(control: AbstractControl) {
    const isValid = /\d/.test(control.value);
    return isValid
      ? null
      : { containsNumber: 'This field should have at least one digit.' };
  }

  public customSignInValidators = {
    username: [this.containsNumber],
  };

  constructor() {}

  ngOnInit(): void {}
}
