import { Component, HostBinding, Input } from '@angular/core';
import {
  FormFieldsArray,
  getFormDataFromEvent,
  authenticatorTextUtil,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

const { getAccountRecoveryInfoText, getSkipText, getSubmitText } =
  authenticatorTextUtil;
@Component({
  selector: 'amplify-confirm-verify-user',
  templateUrl: './amplify-confirm-verify-user.component.html',
})
export class ConfirmVerifyUserComponent {
  @HostBinding('attr.data-amplify-authenticator-confirmverifyuser')
  dataAttr = '';
  @Input() public headerText = getAccountRecoveryInfoText();

  // translated texts
  public skipText = getSkipText();
  public submitText = getSubmitText();
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
