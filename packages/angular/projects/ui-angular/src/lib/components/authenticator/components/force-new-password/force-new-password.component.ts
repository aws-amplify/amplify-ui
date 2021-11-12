import { Component, HostBinding, Input } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-force-new-password',
  templateUrl: './force-new-password.component.html',
})
export class AmplifyForceNewPasswordComponent {
  @HostBinding('attr.data-amplify-authenticator-forcenewpassword')
  dataAttr = '';
  @Input() public headerText = translate('Change Password');

  // translated texts
  public changePasswordText = translate('Change Password');
  public backToSignInText = translate('Back to Sign In');

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    const { updateForm, toSignIn, submitForm, user, error } =
      this.authenticator;
    return { updateForm, toSignIn, submitForm, user, error };
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
