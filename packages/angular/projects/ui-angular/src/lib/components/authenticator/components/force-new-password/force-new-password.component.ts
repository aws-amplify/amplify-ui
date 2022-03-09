import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormField,
  getActorState,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-force-new-password',
  templateUrl: './force-new-password.component.html',
})
export class ForceNewPasswordComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-forcenewpassword')
  dataAttr = '';
  @Input() public headerText = translate('Change Password');

  // translated texts
  public changePasswordText = translate('Change Password');
  public backToSignInText = translate('Back to Sign In');
  public formOverrides: FormField;

  constructor(public authenticator: AuthenticatorService) {}
  ngOnInit(): void {
    this.setFormFields();
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formOverrides =
      getActorState(_state).context?.formFields?.forceNewPassword;
  }

  public grabField(name: string, field: string, defaultV) {
    return this.formOverrides?.[name]?.[field] ?? defaultV;
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
