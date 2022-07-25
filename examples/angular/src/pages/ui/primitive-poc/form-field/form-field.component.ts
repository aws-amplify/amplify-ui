import { Component, OnInit } from '@angular/core';
import { Amplify, I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'amplify-form-field-demo',
  templateUrl: 'form-field.component.html',
})
export class AmplifyFormFieldExampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
