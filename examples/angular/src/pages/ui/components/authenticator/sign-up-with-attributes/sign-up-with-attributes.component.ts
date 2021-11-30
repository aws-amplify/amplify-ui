import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-up-with-attributes',
  templateUrl: 'sign-up-with-attributes.component.html',
})
export class SignUpWithAttributesComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
