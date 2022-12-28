import { Component, OnInit } from '@angular/core';
import { Amplify, Auth, I18n } from 'aws-amplify';
import awsExports from './aws-exports';
import { AuthenticatorService, translations } from '@aws-amplify/ui-angular';

@Component({
  selector: 'sign-up-with-email',
  templateUrl: 'sign-up-with-email.component.html',
})
export class SignUpWithEmailComponent implements OnInit {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

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
    async handleSignUp(formData: Record<string, any>) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: {
          enabled: true,
        },
      });
    },
  };
}
