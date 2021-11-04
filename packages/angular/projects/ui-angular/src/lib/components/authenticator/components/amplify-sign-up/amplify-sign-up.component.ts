import { Component, HostBinding, Input } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent {
  @Input() headerText = translate('Create a new account');

  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';

  // translated texts
  public createAccountText = translate('Create Account');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    const { updateForm, toSignIn, submitForm, error } = this.authenticator;
    return { updateForm, toSignIn, submitForm, error };
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
