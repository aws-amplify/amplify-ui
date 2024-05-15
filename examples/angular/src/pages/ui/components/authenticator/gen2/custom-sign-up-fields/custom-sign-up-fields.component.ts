import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'custom-sign-up-fields',
  templateUrl: 'custom-sign-up-fields.component.html',
})
export class CustomSignUpFieldsComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }

  services = {
    async validateCustomSignUp(formData: Record<string, string>) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms and Conditions',
        };
      }
    },
  };
}
