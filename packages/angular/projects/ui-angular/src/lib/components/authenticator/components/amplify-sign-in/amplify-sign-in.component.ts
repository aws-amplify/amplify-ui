import { Logger } from 'aws-amplify';
import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
// TODO: import from '@/services/...'
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { Subscription } from 'xstate';
import { AuthMachineState, getActorState, SignInState } from '@aws-amplify/ui';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('SignIn');

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';
  @Input() public headerText = translate('Sign in to your account');

  public remoteError = '';
  public isPending = false;

  // translated phrases
  public forgotPasswordText = translate('Forgot your password? ');
  public signInButtonText = translate('Sign in');

  private authSubscription: Subscription;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.authSubscription = this.authenticator.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('signIn.edit');
  }

  public get context() {
    const { change, resetPassword, signUp, submit } =
      this.authenticator.services;
    const remoteError = this.remoteError;
    return { change, remoteError, resetPassword, signUp, submit };
  }

  toResetPassword(): void {
    this.authenticator.send('RESET_PASSWORD');
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

    this.authenticator.send({
      type: 'SUBMIT',
    });
  }
}
