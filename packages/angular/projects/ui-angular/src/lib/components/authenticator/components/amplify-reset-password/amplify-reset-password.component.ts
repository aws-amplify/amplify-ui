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
  selector: 'amplify-reset-password',
  templateUrl: './amplify-reset-password.component.html',
})
export class AmplifyResetPasswordComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-resetPassword') dataAttr = '';
  @Input() public headerText = translate('Reset your password');

  public remoteError = '';
  public isPending = false;

  private authSubscription: Subscription;

  // translated texts
  public sendCodeText = translate('Send Code');
  public backToSignInText = translate('Back to Sign In');

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
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('resetPassword.edit');
  }

  public get context() {
    const { change, signIn, submit } = this.authenticator.services;
    const remoteError = this.remoteError;
    return { change, remoteError, signIn, submit };
  }

  toSignIn(): void {
    this.authenticator.send('SIGN_IN');
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
