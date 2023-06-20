import { Component, HostBinding, Input } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getFormDataFromEvent, authenticatorTextUtil } from '@aws-amplify/ui';

const { getChangePasswordText, getBackToSignInText } = authenticatorTextUtil;

@Component({
  selector: 'amplify-force-new-password',
  templateUrl: './force-new-password.component.html',
})
export class ForceNewPasswordComponent {
  @HostBinding('attr.data-amplify-authenticator-forcenewpassword')
  dataAttr = '';
  @Input() public headerText = getChangePasswordText();

  // translated texts
  public changePasswordText = getChangePasswordText();
  public backToSignInText = getBackToSignInText();

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
