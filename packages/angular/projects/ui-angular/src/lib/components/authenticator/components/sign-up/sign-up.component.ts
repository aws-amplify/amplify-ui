import { Component, HostBinding } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getFormDataFromEvent, authenticatorTextUtil } from '@aws-amplify/ui';

const { getCreateAccountText } = authenticatorTextUtil;

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';

  // translated texts
  public createAccountText = getCreateAccountText();

  constructor(public authenticator: AuthenticatorService) {}

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  onInput(event: Event): void {
    const { checked, name, type, value } = <HTMLInputElement>event.target;
    const isUncheckedCheckbox = type === 'checkbox' && !checked;

    this.authenticator.updateForm({
      name,
      value: isUncheckedCheckbox ? undefined : value,
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
