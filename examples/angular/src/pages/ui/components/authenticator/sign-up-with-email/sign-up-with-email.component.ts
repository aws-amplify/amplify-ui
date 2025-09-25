import { Component, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';
import { signUp, SignUpInput } from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { translations } from '@aws-amplify/ui';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

@Component({
  selector: 'sign-up-with-email',
  templateUrl: 'sign-up-with-email.component.html',
})
export class SignUpWithEmailComponent implements OnInit {
  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit() {
    I18n.putVocabularies(translations);
    I18n.setLanguage('en');
    I18n.putVocabulariesForLanguage('en', {
      'Your code is on the way. To log in, enter the code we emailed to':
        'Enter this code:',
      'It may take a minute to arrive':
        'It will take several minutes to arrive',
    });
  }

  public formFields = {
    confirmSignUp: {
      confirmation_code: {
        placeholder: 'Enter the code given',
        isRequired: true,
      },
    },
  };

  get authStatus() {
    return this.authenticator.authStatus;
  }

  services = {
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const customUsername = input.username.toLowerCase();
      const customEmail = input.options?.userAttributes?.email?.toLowerCase();
      return signUp({
        ...input,
        username: customUsername,
        options: {
          ...input?.options,
          userAttributes: {
            ...input?.options?.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };
}
