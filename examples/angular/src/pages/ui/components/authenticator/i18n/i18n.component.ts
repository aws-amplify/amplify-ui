import { Component, OnInit } from '@angular/core';
import awsExports from '@environments/auth-with-email/src/aws-exports';
import Amplify, { I18n } from '@aws-amplify/core';
@Component({
  selector: 'i18n',
  templateUrl: 'i18n.component.html',
})
export class I18nComponent implements OnInit {
  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit() {
    I18n.setLanguage('ja');
  }

  ngOnDestroy() {
    I18n.setLanguage('en'); // reset the languages back
  }
}
