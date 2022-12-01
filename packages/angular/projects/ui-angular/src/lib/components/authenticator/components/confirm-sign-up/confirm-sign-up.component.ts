import { Component, HostBinding } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormFieldsArray,
  getFormDataFromEvent,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

const {
  getResendCodeText,
  getConfirmText,
  getDeliveryMethodText,
  getDeliveryMessageText,
} = authenticatorTextUtil;
@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
})
export class ConfirmSignUpComponent {
  @HostBinding('attr.data-amplify-authenticator-confirmsignup') dataAttr = '';

  // translated texts
  public resendCodeText = getResendCodeText();
  public confirmText = getConfirmText();

  public sortedFormFields: FormFieldsArray;

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    return this.authenticator.slotContext;
  }

  public get confirmSignUpHeading(): string {
    const { codeDeliveryDetails } = this.authenticator;
    return getDeliveryMethodText(codeDeliveryDetails);
  }

  public get subtitleText(): string {
    const { codeDeliveryDetails } = this.authenticator;
    return getDeliveryMessageText(codeDeliveryDetails);
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
