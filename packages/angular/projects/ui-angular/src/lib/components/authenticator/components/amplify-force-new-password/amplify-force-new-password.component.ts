import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'xstate';
import { Logger } from 'aws-amplify';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/state-machine.service';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('ForceNewPassword');

@Component({
  selector: 'amplify-force-new-password',
  templateUrl: './amplify-force-new-password.component.html',
})
export class AmplifyForceNewPasswordComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-forcenewpassword')
  dataAttr = '';
  @Input() public headerText = translate('Change Password');

  public remoteError = '';
  public isPending = false;

  private authSubscription: Subscription;

  // translated texts
  public changePasswordText = translate('Change Password');
  public backToSignInText = translate('Back to Sign In');

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
    this.isPending = actorState.matches({
      signUp: {
        submission: 'idle',
      },
    });
  }

  public get context() {
    const { change, signIn, submit } = this.authenticator.services;
    const user = this.authenticator.user;
    const remoteError = this.remoteError;
    return { change, remoteError, signIn, submit, user };
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
    // consider stateMachine directly providing actorState / actorContext
    const state = this.authenticator.authState;
    const actorState: SignInContext = getActorContext(state);
    const { formValues } = actorState;

    this.authenticator.send({
      type: 'SUBMIT',
      data: formValues,
    });
  }
}
