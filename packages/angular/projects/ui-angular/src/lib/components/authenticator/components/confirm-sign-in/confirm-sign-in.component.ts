import { Component, HostBinding, OnInit } from '@angular/core';
import { Logger } from 'aws-amplify';
import {
  AuthChallengeNames,
  FormFieldsArray,
  getActorContext,
  getFormDataFromEvent,
  SignInContext,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('ConfirmSignIn');

@Component({
  selector: 'amplify-confirm-sign-in',
  templateUrl: './confirm-sign-in.component.html',
})
export class ConfirmSignInComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';

  // translated texts
  public headerText: string;
  public confirmText = translate('Confirm');
  public backToSignInText = translate('Back to Sign In');
  public sortedFormFields: FormFieldsArray;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setHeaderText();
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  setHeaderText(): void {
    const state = this.authenticator.authState;
    const actorContext = getActorContext(state) as SignInContext;
    const { challengeName } = actorContext;
    switch (challengeName) {
      case AuthChallengeNames.SOFTWARE_TOKEN_MFA:
        this.headerText = translate('Confirm TOTP Code');
        break;
      case AuthChallengeNames.SMS_MFA:
        this.headerText = translate('Confirm SMS Code');
        break;
      default:
        logger.error('Unexpected challengeName', challengeName);
    }
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
