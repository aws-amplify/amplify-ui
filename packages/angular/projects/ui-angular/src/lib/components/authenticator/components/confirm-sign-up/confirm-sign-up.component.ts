import { Component, HostBinding, Input } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';
@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
})
export class AmplifyConfirmSignUpComponent {
  @Input() headerText = translate('Confirm Sign Up');

  @HostBinding('attr.data-amplify-authenticator-confirmsignup') dataAttr = '';

  // translated texts
  public resendCodeText = translate('Resend Code');
  public confirmText = translate('Confirm');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    const { updateForm, resendCode, isPending, submitForm, error } =
      this.authenticator;

    return {
      updateForm,
      resendCode,
      isPending,
      submitForm,
      error,
    };
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm();
  }
}
