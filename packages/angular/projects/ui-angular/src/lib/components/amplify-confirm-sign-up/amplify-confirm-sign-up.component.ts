import { Component, HostBinding, TemplateRef } from '@angular/core';
import { AuthMachineState } from '@aws-amplify/ui-core';
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
    const username = this.stateMachine.user?.username;
    if (username) {
      this.username = username;
      this.stateMachine.send({
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
    this.remoteError = state.context.remoteError;
    this.isPending = !state.matches('confirmSignUp.edit');
  }

  toSignIn(): void {
    this.stateMachine.send('SIGN_IN');
  }

  resend(): void {
    this.stateMachine.send({
      type: 'RESEND',
      data: {
        username: this.stateMachine.user?.username,
      },
    });
  }

  onInput($event) {
    $event.preventDefault();
    const { name, value } = $event.target;
    this.stateMachine.send({
      type: 'INPUT',
      data: { name, value },
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const formValues = this.stateMachine.context.formValues;
    // get form data
    const { username, confirmation_code } = formValues;

    this.stateMachine.send({
      type: 'SUBMIT',
      data: { username, confirmation_code },
    });
  }
}
