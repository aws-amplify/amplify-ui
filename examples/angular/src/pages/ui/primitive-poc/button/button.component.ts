import { Component, OnInit } from '@angular/core';
import { Amplify, I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'amplify-button-demo',
  templateUrl: 'button.component.html',
})
export class AmplifyButtonExampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
