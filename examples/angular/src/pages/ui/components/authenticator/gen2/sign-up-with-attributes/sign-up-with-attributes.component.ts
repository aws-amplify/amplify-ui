import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'sign-up-with-attributes',
  templateUrl: 'sign-up-with-attributes.component.html',
})
export class SignUpWithAttributesComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
