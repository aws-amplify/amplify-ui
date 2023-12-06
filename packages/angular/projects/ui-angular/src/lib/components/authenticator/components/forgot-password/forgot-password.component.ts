import { Component, HostBinding, Input } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormFieldsArray,
  getFormDataFromEvent,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

const { getResetYourPasswordText, getSendCodeText, getBackToSignInText } =
  authenticatorTextUtil;

@Component({
  selector: 'amplify-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  @HostBinding('attr.data-amplify-authenticator-forgotpassword') dataAttr = '';
  @Input() public headerText = getResetYourPasswordText();

  // translated texts
  public sendCodeText = getSendCodeText();
  public backToSignInText = getBackToSignInText();
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
