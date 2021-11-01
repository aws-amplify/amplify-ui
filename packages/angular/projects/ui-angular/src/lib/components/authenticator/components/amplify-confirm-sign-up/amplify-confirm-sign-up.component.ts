import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
} from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { StateMachineService } from '../../../../services/state-machine.service';
import { translate } from '@aws-amplify/ui';
@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './amplify-confirm-sign-up.component.html',
})
export class AmplifyConfirmSignUpComponent implements OnInit, OnDestroy {
  @Input() headerText = translate('Confirm Sign Up');

  @HostBinding('attr.data-amplify-authenticator-confirmsignup') dataAttr = '';

  private authSubscription: Subscription;
  public username: string;
  public remoteError = '';
  public isPending = false;

  // translated texts
  public resendCodeText = translate('Resend Code');
  public confirmText = translate('Confirm');

  constructor(private stateMachine: StateMachineService) {}

  ngOnInit(): void {
    // TODO: alias for subscribe
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignUpState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('confirmSignUp.edit');
  }

  public get context() {
    const { change, resend, signIn, submit } = this.stateMachine.services;
    const remoteError = this.remoteError;
    const username = this.username;
    return { change, remoteError, resend, signIn, submit, username };
  }
  resend(): void {
    this.stateMachine.send({
      type: 'RESEND',
      data: {
        username: this.username,
      },
    });
  }

  onInput($event) {
    $event.preventDefault();
    const { name, value } = $event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const state = this.stateMachine.authState;
    const actorContext: SignUpContext = getActorContext(state);
    const { formValues } = actorContext;
    const { username, confirmation_code } = formValues;

    this.stateMachine.send({
      type: 'SUBMIT',
      data: { username, confirmation_code },
    });
  }
}
