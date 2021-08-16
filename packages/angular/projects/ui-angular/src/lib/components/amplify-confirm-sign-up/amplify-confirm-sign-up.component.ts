import { Component, HostBinding, TemplateRef } from '@angular/core';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
} from '@aws-amplify/ui-core';
import { Logger } from '@aws-amplify/core';
import { Subscription } from 'xstate';
import { AuthPropService, StateMachineService } from '../../services';

const logger = new Logger('ConfirmSignUp');

@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './amplify-confirm-sign-up.component.html',
})
export class AmplifyConfirmSignUpComponent {
  @HostBinding('attr.data-amplify-authenticator-confirmsignup') dataAttr = '';
  public customComponents: Record<string, TemplateRef<any>> = {};
  private authSubscription: Subscription;
  public username: string;
  public remoteError = '';
  public isPending = false;
  public context = () => ({});

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    // TODO: alias for subscribe
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
    this.setUsername();
  }

  setUsername() {
    const state = this.stateMachine.authState;
    const actorContext: SignUpContext = getActorContext(state);
    const { user, authAttributes } = actorContext;
    const username = user?.username ?? authAttributes?.username;
    if (username) {
      this.username = username;
      this.stateMachine.send({
        type: 'CHANGE',
        data: { name: 'username', value: this.username },
      });
    }
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    logger.log(
      'confirm sign up destroyed, unsubscribing from state machine...'
    );
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignUpState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('confirmSignUp.edit');
  }

  toSignIn(): void {
    this.stateMachine.send('SIGN_IN');
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

  onSubmit(event: Event) {
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
