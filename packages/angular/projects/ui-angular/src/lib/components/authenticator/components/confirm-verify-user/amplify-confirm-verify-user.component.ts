import { Component, HostBinding, Input } from '@angular/core';
import {
  FormFieldsArray,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-confirm-verify-user',
  templateUrl: './amplify-confirm-verify-user.component.html',
})
export class ConfirmVerifyUserComponent {
  @HostBinding('attr.data-amplify-authenticator-confirmverifyuser')
  dataAttr = '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  // translated texts
  public skipText = translate('Skip');
  public submitText = translate('Submit');
  public sortedFormFields: FormFieldsArray;

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
