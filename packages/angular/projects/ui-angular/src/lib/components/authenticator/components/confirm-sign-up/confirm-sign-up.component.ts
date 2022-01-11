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

  public get confirmSignUpHeading(): string {
    const { codeDeliveryDetails: { DeliveryMedium } = {} } = this.authenticator;
    return DeliveryMedium === 'EMAIL'
      ? translate('We Emailed You')
      : DeliveryMedium === 'SMS'
      ? translate('We Texted You')
      : translate('We Sent A Code');
  }

  public get subtitleText(): string {
    const { codeDeliveryDetails: { DeliveryMedium, Destination } = {} } =
      this.authenticator;
    return DeliveryMedium === 'EMAIL'
      ? `Your code is on the way. To log in, enter the code we emailed to ${Destination}. It may take a minute to arrive.`
      : DeliveryMedium === 'SMS'
      ? `Your code is on the way. To log in, enter the code we texted to ${Destination}. It may take a minute to arrive.`
      : translate(
          `Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.`
        );
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
