import { Component, OnInit } from '@angular/core';
import { FormError, AuthFormData } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-custom-form-authenticator',
  templateUrl: './on-submit-authenticator.component.html'
})
export class OnSubmitAuthenticatorComponent {
  public trimUsername(formData: AuthFormData): void {
    formData.username = formData.username?.trim();
  }

  public usernameContainsDigit(formData: AuthFormData, errors: FormError) {
    const { username } = formData;
    const containsDigit = /\d/.test(username);
    if (!containsDigit) {
      errors.username = ['Username must contain a digit'];
    }
  }
}
