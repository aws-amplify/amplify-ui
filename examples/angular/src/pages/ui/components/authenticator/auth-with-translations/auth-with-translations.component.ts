import { Component, OnInit } from '@angular/core';
import { DefaultTexts } from '@aws-amplify/ui';
import awsExports from '@environments/auth-with-email/src/aws-exports';
import Amplify, { I18n } from 'aws-amplify';
@Component({
  selector: 'auth-with-translations',
  templateUrl: 'auth-with-translations.component.html',
})
export class AuthWithTranslationsComponent implements OnInit {
  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit() {
    I18n.setLanguage('ja');

    // Provide missing translations
    I18n.putVocabulariesForLanguage('ja', {
      [DefaultTexts.CONFIRM_PASSWORD_LABEL]: 'パスワードの確認',
      [DefaultTexts.CONFIRM_SMS_LABEL]: 'SMSコードを確認する',
      [DefaultTexts.CONFIRM_TOTP_LABEL]: 'TOTPコードを確認する',
    });

    // Or customers can use helper to get autocompletition
    // import { putTranslationsForLang } from '@aws-amplify/ui'

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
