import { Component, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';

import { translations } from '@aws-amplify/ui';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-sms-mfa',
  standalone: false,
  templateUrl: 'sign-in-sms-mfa.component.html',
})
export class SignInSMSMFAComponent implements OnInit {
  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
    I18n.putVocabularies(translations);
    I18n.setLanguage('en');
    I18n.putVocabulariesForLanguage('en', {
      'CodeMismatchException: Invalid code or auth state for the user.':
        'invalid code',
    });
  }
}
