import { Component, OnInit } from '@angular/core';
import Amplify, { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';
import { DefaultTexts } from '@aws-amplify/ui-angular';
import awsExports from '@environments/auth-with-email/src/aws-exports';
@Component({
  selector: 'auth-with-translations',
  templateUrl: 'auth-with-translations.component.html',
})
export class AuthWithTranslationsComponent implements OnInit {
  constructor() {
    Amplify.configure({
      ...awsExports,
      auth: {
        login_mechanisms: ['email'],
      },
    });
  }

  ngOnInit() {
    I18n.putVocabularies(translations); // TODO: this should be done by amplify
    I18n.setLanguage('ja');

    // Provide missing translations
    I18n.putVocabulariesForLanguage('ja', {
      [DefaultTexts.CONFIRM_PASSWORD_LABEL]: 'パスワードの確認',
    });

    // Or customers can use helper to get autocompletition
    // putTranslationsForLang('ja', {
    //   'Confirm Password': 'パスワードの確認',
    //   'Confirm SMS Code': 'SMSコードを確認する',
    //   'Confirm TOTP Code': 'TOTPコードを確認する',
    // });
  }

  ngOnDestroy() {
    I18n.setLanguage('en'); // reset the languages back
  }
}
