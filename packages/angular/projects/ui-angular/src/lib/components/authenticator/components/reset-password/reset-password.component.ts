import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormFields,
  getActorState,
  getAliasInfoFromContext,
  getFormDataFromEvent,
  getFormFields,
  translate,
} from '@aws-amplify/ui';

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
  public formFields: FormFields;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formFields = getFormFields('resetPassword', _state);
  }

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
