import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getAliasInfoFromContext, translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-resetPassword') dataAttr = '';
  @Input() public headerText = translate('Reset your password');

  // translated texts
  public sendCodeText = translate('Send Code');
  public backToSignInText = translate('Back to Sign In');
  public labelText = translate<string>('Username');

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const { authState } = this.authenticator;
    const { label } = getAliasInfoFromContext(authState.context);
    this.labelText = `Enter your ${label.toLowerCase()}`;
  }

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
