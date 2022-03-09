import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  SortedFormFields,
  getFormDataFromEvent,
  getSortedFormFields,
  translate,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-confirm-verify-user',
  templateUrl: './amplify-confirm-verify-user.component.html',
})
export class ConfirmVerifyUserComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-confirmverifyuser')
  dataAttr = '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  // translated texts
  public skipText = translate('Skip');
  public submitText = translate('Submit');
  public sortedFormFields: SortedFormFields;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.sortedFormFields = getSortedFormFields('confirmVerifyUser', _state);
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
