import { Component, OnInit } from '@angular/core';
import {
  getActorContext,
  getFormDataFromEvent,
  authenticatorTextUtil,
  ComponentClassName,
  classNames,
} from '@aws-amplify/ui';

import { AuthenticatorService } from '../../../../services/authenticator.service';

const {
  getConfirmText,
  getBackToSignInText,
  getSelectMfaTypeText,
  getSelectMfaTypeByChallengeName,
  getMfaTypeLabelByValue,
} = authenticatorTextUtil;

@Component({
  selector: 'amplify-select-mfa-type',
  templateUrl: './select-mfa-type.component.html',
})
export class SelectMfaTypeComponent implements OnInit {
  public headerText: string;
  public confirmText = getConfirmText();
  public backToSignInText = getBackToSignInText();
  public selectMfaTypeText = getSelectMfaTypeText();
  public getMfaTypeLabelByValue = getMfaTypeLabelByValue;

  public allowedMfaTypes = [];

  public classNames = classNames;
  public ComponentClassName = ComponentClassName;

  constructor(public authenticator: AuthenticatorService) {}

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  ngOnInit(): void {
    this.setHeaderText();
    this.setAllowedMfaTypes();
  }

  setHeaderText(): void {
    const actorContext = getActorContext(this.authenticator.authState);
    this.headerText = getSelectMfaTypeByChallengeName(
      actorContext.challengeName
    );
  }

  setAllowedMfaTypes(): void {
    const actorContext = getActorContext(this.authenticator.authState);
    this.allowedMfaTypes = actorContext.allowedMfaTypes;
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
