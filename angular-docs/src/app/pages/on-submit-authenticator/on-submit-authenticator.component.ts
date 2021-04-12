import { Component, OnInit } from '@angular/core';
import {
  FormError,
  AuthFormData,
  OnSubmitHookResponse
} from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-custom-form-authenticator',
  templateUrl: './on-submit-authenticator.component.html'
})
export class OnSubmitAuthenticatorComponent {
  public trimUsername(formData: AuthFormData): void {
    formData.username = formData.username?.trim();
  }

  public usernameContainsDigit(formData: AuthFormData): OnSubmitHookResponse {
    const { username } = formData;
    const error: FormError = {};

    const containsDigit = /\d/.test(username);
    if (!containsDigit) {
      error.username = ['This field should contain at least one digit.'];
    }
    return { error };
  }
}
