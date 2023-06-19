import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  FormFieldsArray,
} from '@aws-amplify/ui';

const { getForgotPasswordText, getSignInText } = authenticatorTextUtil;

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';

  public forgotPasswordText = getForgotPasswordText();
  public signInButtonText = getSignInText();
  public sortedFormFields: FormFieldsArray;

  constructor(public authenticator: AuthenticatorService) {}

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
