import { Component, OnInit } from '@angular/core';
import {
  AuthFormData,
  FormError,
  OnSubmitHookResponse
} from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-custom-form-authenticator',
  templateUrl: './custom-form-authenticator.component.html'
})
export class CustomFormAuthenticatorComponent {
  public onSignUp(formData: AuthFormData): OnSubmitHookResponse {
    const { password, confirm_password } = formData;

    if (password !== confirm_password) {
      const error = { confirm_password: ['Your passwords must match'] };
      return { error };
    } else {
      delete formData['confirm_password'];
      return { data: formData };
    }
  }
}
