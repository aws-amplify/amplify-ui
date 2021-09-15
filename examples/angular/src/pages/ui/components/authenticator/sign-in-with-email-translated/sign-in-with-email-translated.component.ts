import { Component, OnInit } from '@angular/core';
import Amplify, { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';
import awsExports from '@environments/auth-with-email/src/aws-exports';

I18n.putVocabularies(translations);
I18n.setLanguage('ja');

@Component({
  selector: 'sign-in-with-email-translated',
  templateUrl: 'sign-in-with-email-translated.component.html',
})
export class SignInWithEmailTranslatedComponent implements OnInit {
  constructor() {
    Amplify.configure({
      ...awsExports,
      auth: {
        login_mechanisms: ['email'],
      },
    });
  }

  ngOnInit() {}
}
