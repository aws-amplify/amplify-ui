import { Component, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-angular';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-with-phone',
  templateUrl: 'sign-in-with-phone.component.html',
})
export class SignInWithPhoneComponent implements OnInit {
  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
    I18n.putVocabularies(translations);
    I18n.setLanguage('en');
    I18n.putVocabulariesForLanguage('en', {
      'Password does not conform to policy: Password not long enough':
        'Your password is too short! Try a longer password!',
    });
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
        dialCodeList: ['+1', '+82', '+227', '+100'],
      },
    },
  };
}
