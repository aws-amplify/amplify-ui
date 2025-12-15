import { Component, OnInit } from '@angular/core';
import { translations } from '@aws-amplify/ui-angular';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
@Component({
  selector: 'i18n',
  standalone: false,
  templateUrl: 'i18n.component.html',
})
export class I18nComponent implements OnInit {
  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit() {
    I18n.putVocabularies(translations);
    I18n.setLanguage('ja');
    I18n.putVocabulariesForLanguage('ja', {
      'Sign In': 'Sign In Custom',
      'User does not exist.': 'Error with your user',
    });
  }

  ngOnDestroy() {
    I18n.setLanguage('en'); // reset the languages back
  }
}
