import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthMachineState, getActorState, SignInState } from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-confirm-reset-password',
  templateUrl: './amplify-confirm-reset-password.component.html',
})
export class ConfirmResetPasswordComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';
  @Input() public headerText = translate('Reset your password');

  public remoteError = '';
  public isPending = false;
  private authSubscription: Subscription;

  // translated strings
  public sendCodeText = translate('Send Code');
  public backToSignInText = translate('Back to Sign In');
  public resendCodeText = translate('Resend Code');

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.authSubscription = this.authenticator.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState = getActorState(state) as SignInState;
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('confirmResetPassword.edit');
  }

  public get context() {
    const { change, resend, signIn, submit } = this.authenticator.services;
    const remoteError = this.remoteError;
    return { change, resend, remoteError, signIn, submit };
  }

  toSignIn(): void {
    this.authenticator.send('SIGN_IN');
  }

  resend() {
    this.authenticator.send('RESEND');
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.send('SUBMIT');
  }
}
