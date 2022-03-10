import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormField,
  getActorState,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-confirm-reset-password',
  templateUrl: './amplify-confirm-reset-password.component.html',
})
export class ConfirmResetPasswordComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';
  @Input() public headerText = translate('Reset your password');

  // translated strings
  public sendCodeText = translate('Send Code');
  public backToSignInText = translate('Back to Sign In');
  public resendCodeText = translate('Resend Code');
  public formOverrides: FormField;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formOverrides =
      getActorState(_state).context?.formFields?.confirmResetPassword;
  }

  public grabField(name: string, field: string, defaultV) {
    return this.formOverrides?.[name]?.[field] ?? defaultV;
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
