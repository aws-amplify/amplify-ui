import { Component, HostBinding, Input } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';
@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
})
export class ConfirmSignUpComponent {
  @Input() headerText = translate('Confirm Sign Up');

  @HostBinding('attr.data-amplify-authenticator-confirmsignup') dataAttr = '';

  // translated texts
  public resendCodeText = translate('Resend Code');
  public confirmText = translate('Confirm');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    return this.authenticator.slotContext;
  }

  public get deliveryText(): string {
    return this.authenticator.codeDeliveryDetails.DeliveryMedium === 'EMAIL'
      ? 'Emailed'
      : 'Texted';
  }

  public get confirmSignUpHeading(): string {
    return translate(`We ${this.deliveryText} You`);
  }

  public get subtitleText(): string {
    return translate(`Your code is on the way. To log in, enter the code we
            ${this.deliveryText.toLowerCase()} to
            ${
              this.authenticator.codeDeliveryDetails.Destination
            }. It may take a minute to
            arrive.`);
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
