import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormFieldsArray,
  getFormDataFromEvent,
  hasTranslation,
  translate,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-confirm-reset-password',
  templateUrl: './amplify-confirm-reset-password.component.html',
})
export class ConfirmResetPasswordComponent {
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';
  @Input() public headerText = translate('Reset your password');

  // translated strings
  public backToSignInText = translate('Back to Sign In');
  public resendCodeText = translate('Resend Code');
  public sortedFormFields: FormFieldsArray;
  /**
   * Support backwards compatibility for erroneous 'Send Code' text
   * See https://github.com/aws-amplify/amplify-ui/issues/1784
   * TODO: Remove support for 'Send Code' translation in next Major release
   */
  public submitText = hasTranslation('Submit')
    ? translate('Submit')
    : translate('Send Code');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    return this.authenticator.slotContext;
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
