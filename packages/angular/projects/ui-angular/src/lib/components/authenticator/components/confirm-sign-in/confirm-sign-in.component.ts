import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormFieldsArray,
  getActorContext,
  getFormDataFromEvent,
  SignInContext,
  authenticatorTextUtil,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

const { getConfirmText, getBackToSignInText, getChallengeText } =
  authenticatorTextUtil;

@Component({
  selector: 'amplify-confirm-sign-in',
  templateUrl: './confirm-sign-in.component.html',
})
export class ConfirmSignInComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';

  // translated texts
  public headerText: string;
  public confirmText = getConfirmText();
  public backToSignInText = getBackToSignInText();
  public sortedFormFields: FormFieldsArray;

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
    const { challengeName } = actorContext;
    this.headerText = getChallengeText(challengeName);
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
