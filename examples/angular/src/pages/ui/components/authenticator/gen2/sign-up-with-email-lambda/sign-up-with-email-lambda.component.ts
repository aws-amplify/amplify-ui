import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'sign-up-with-email-lambda',
  templateUrl: 'sign-up-with-email-lambda.component.html',
})
export class SignUpWithEmailLambdaComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
