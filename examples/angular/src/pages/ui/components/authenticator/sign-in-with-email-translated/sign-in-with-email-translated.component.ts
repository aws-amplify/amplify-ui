import { Component, OnInit } from '@angular/core';
import Amplify, { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';
import { putTranslationsForLang } from '@aws-amplify/ui-angular';
import awsExports from '@environments/auth-with-email/src/aws-exports';
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

  ngOnInit() {
    I18n.putVocabularies(translations); // TODO: this should be done by amplify
    I18n.setLanguage('ja');

    // Confirm password field is missing for japanese. Add it in:
    putTranslationsForLang('ja', {
      'Confirm Password': 'パスワードの確認',
    });

    // Or customers can use I18n directly with constants array:
    // I18n.putVocabulariesForLanguage('ja', {
    //   [DefaultTexts.CONFIRM_PASSWORD_LABEL]: 'パスワードの確認',
    // });
  }

  ngOnDestroy() {
    I18n.setLanguage('en');
  }
}
