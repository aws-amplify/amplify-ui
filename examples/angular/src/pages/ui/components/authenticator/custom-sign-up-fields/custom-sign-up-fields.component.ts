import { Component } from '@angular/core';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'custom-sign-up-fields',
  templateUrl: 'custom-sign-up-fields.component.html',
})
export class CustomSignUpFieldsComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  services = {
    async validateCustomSignUp(formData: Record<string, string>) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms & Conditions',
        };
      }
    },
  };
}
