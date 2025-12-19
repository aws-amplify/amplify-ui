import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'custom-sign-up-fields',
  standalone: false,
  templateUrl: 'custom-sign-up-fields.component.html',
})
export class CustomSignUpFieldsComponent {
  services = {
    async validateCustomSignUp(formData: Record<string, string>): Promise<{
      acknowledgement: string;
    } | void> {
      if (!formData.acknowledgement) {
        return Promise.resolve({
          acknowledgement: 'You must agree to the Terms and Conditions',
        });
      }
    },
  };
  constructor() {
    Amplify.configure(awsExports);
  }
}
