import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-form-authenticator',
  templateUrl: './custom-form-authenticator.component.html',
})
export class CustomFormAuthenticatorComponent implements OnInit {
  public signInValidators = {
    username: [Validators.minLength(4)],
  };
  constructor() {}

  ngOnInit(): void {}
}
