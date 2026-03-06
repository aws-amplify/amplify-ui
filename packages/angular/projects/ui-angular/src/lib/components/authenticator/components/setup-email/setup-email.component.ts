import { Component } from '@angular/core';
import {
  authenticatorTextUtil,
  classNames,
  ComponentClassName,
  getFormDataFromEvent,
} from '@aws-amplify/ui';

import { AuthenticatorService } from '../../../../services/authenticator.service';

const { getConfirmText, getBackToSignInText, getSetupEmailText } =
  authenticatorTextUtil;

@Component({
  selector: 'amplify-setup-email',
  standalone: false,
  templateUrl: './setup-email.component.html',
})
export class SetupEmailComponent {
  public headerText = getSetupEmailText();
  public confirmText = getConfirmText();
  public backToSignInText = getBackToSignInText();

  public classNames = classNames;
  public ComponentClassName = ComponentClassName;

  constructor(public authenticator: AuthenticatorService) {}

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  onInput(event: Event): void {
    event.preventDefault();

    const { name, value } = event.target as HTMLInputElement;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
