import { Component } from '@angular/core';

import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-phone-number/${process.env.PATH}`)
).default;

@Component({
  selector: 'sign-up-with-phone',
  templateUrl: 'sign-up-with-phone.component.html',
})
export class SignUpWithPhoneComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
