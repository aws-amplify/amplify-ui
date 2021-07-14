import { Component, HostBinding, TemplateRef } from '@angular/core';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';
import { Logger } from '@aws-amplify/core';
import { Event, Subscription } from 'xstate';
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
  public context = () => ({});

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    // TODO: alias for subscribe
    this.authSubscription = this.stateMachine.authService.subscribe(state =>
      this.onStateUpdate(state)
    );
    const username = this.stateMachine.user?.username;
    if (username) {
      this.username = username;
      this.send({
        type: 'INPUT',
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
    const message = state.event.data?.message;
    logger.info('An error was encountered while signing up:', message);
  }

  public isLoading(): boolean {
    return !this.stateMachine.authState.matches('confirmSignUp.edit');
  }

  send(event: Event<AuthEvent>): void {
    this.stateMachine.authService.send(event);
  }

  toSignIn(): void {
    this.send('SIGN_IN');
  }

  resend(): void {
    this.send({
      type: 'RESEND',
      data: {
        username: this.stateMachine.user?.username,
      },
    });
  }

  onInput($event) {
    $event.preventDefault();
    const { name, value } = $event.target;
    this.send({
      type: 'INPUT',
      data: { name, value },
    });
  }

  async onSubmit($event): Promise<void> {
    $event.preventDefault();
    // get form data
    const formValues = this.stateMachine.authState.context.formValues;
    logger.log('Confirm sign up form submitted with', formValues);

    this.send({
      type: 'SUBMIT',
      data: formValues,
    });
  }
}
