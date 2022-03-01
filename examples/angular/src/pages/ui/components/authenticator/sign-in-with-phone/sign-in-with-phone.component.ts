import { Component } from '@angular/core';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-with-phone',
  templateUrl: 'sign-in-with-phone.component.html',
})
export class SignInWithPhoneComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  public formFields = {
    signIn: {
      username: {
        dialCode: '+82',
      },
    },
    signUp: {
      phone_number: {
        dialCode: '+227',
        dialCodeList: ['+1', '+82', '+227', '+100', '+227'],
      },
    },
  };
}
