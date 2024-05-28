import { Component, OnInit } from '@angular/core';
import { translations } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'i18n',
  templateUrl: 'i18n.component.html',
})
export class I18nComponent implements OnInit {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }

  ngOnInit() {
    I18n.putVocabularies(translations);
    I18n.setLanguage('ja');
    I18n.putVocabulariesForLanguage('ja', {
      'Sign In': 'Sign In Custom',
      'User does not exist.': 'Error with your user',
      'Incorrect username or password.': 'Error with your user',
    });
  }

  ngOnDestroy() {
    I18n.setLanguage('en'); // reset the languages back
  }
}
