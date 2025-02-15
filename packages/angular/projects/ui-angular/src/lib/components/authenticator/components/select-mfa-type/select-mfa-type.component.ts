import { Component, OnInit } from '@angular/core';
import {
  getActorContext,
  getFormDataFromEvent,
  SignInContext,
  authenticatorTextUtil,
  ComponentClassName,
  classNames,
} from '@aws-amplify/ui';

import { AuthenticatorService } from '../../../../services/authenticator.service';

const { getConfirmText, getBackToSignInText, getSelectMfaTypeByChallengeName } =
  authenticatorTextUtil;

@Component({
  selector: 'amplify-select-mfa-type',
  templateUrl: './select-mfa-type.component.html',
})
export class SelectMfaTypeComponent implements OnInit {
  public headerText: string;
  public confirmText = getConfirmText();
  public backToSignInText = getBackToSignInText();
  public classNames = classNames;
  public ComponentClassName = ComponentClassName;

  constructor(public authenticator: AuthenticatorService) {}

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  ngOnInit(): void {
    this.setHeaderText();
  }

  setHeaderText(): void {
    const state = this.authenticator.authState;
    const actorContext = getActorContext(state) as SignInContext;
    this.headerText = getSelectMfaTypeByChallengeName(
      actorContext.challengeName
    );
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
