import {
  Component,
  EventEmitter,
  HostBinding,
  Output,
  TemplateRef
} from '@angular/core';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';
import { Logger } from '@aws-amplify/core';
import { Event, Subscription } from 'xstate';
import { AuthFormData, FormError } from '../../common';
import {
  AuthenticatorContextService,
  StateMachineService
} from '../../services';

const logger = new Logger('ConfirmSignUp');

@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './amplify-confirm-sign-up.component.html'
})
export class AmplifyConfirmSignUpComponent {
  // custom events
  @Output() onConfirmSignUpInput = new EventEmitter<AuthFormData>();
  @Output() onConfirmSignUpSubmit = new EventEmitter<AuthFormData>();

  @HostBinding('attr.data-ui-sign-up') dataAttr = '';
  public customComponents: Record<string, TemplateRef<any>> = {};
  private authSubscription: Subscription;
  public username: string;
  public context = () => ({
    errors: this.contextService.formError
  });

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthenticatorContextService
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
        data: { name: 'username', value: this.username }
      });
    }
  }

  ngAfterContentInit(): void {
    this.contextService.formError = {};
    this.customComponents = this.contextService.customComponents;
    const props = this.contextService.props?.confirmSignUp;
    if (props) {
      this.onConfirmSignUpInput = props.onConfirmSignUpInput;
      this.onConfirmSignUpSubmit = props.onConfirmSignUpSubmit;
    }
  }

  ngOnDestroy(): void {
    logger.log(
      'confirm sign up destroyed, unsubscribing from state machine...'
    );
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const formValues = state.context.formValues;
    if (state.matches('confirmSignUp.edit.error')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
    } else if (state.event.type === 'INPUT') {
      this.onConfirmSignUpInput.emit(formValues);
    }
  }

  public isLoading(): boolean {
    return !this.stateMachine.authState.matches('confirmSignUp.edit');
  }

  get formError(): FormError {
    return this.contextService.formError;
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
        username: this.stateMachine.user?.username
      }
    });
  }

  onInput($event) {
    $event.preventDefault();
    const { name, value } = $event.target;
    this.send({
      type: 'INPUT',
      data: { name, value }
    });
  }

  async onSubmit($event): Promise<void> {
    $event.preventDefault();
    this.contextService.formError = {};
    // get form data
    const formValues = this.stateMachine.authState.context.formValues;
    logger.log('Confirm sign up form submitted with', formValues);

    if (this.onConfirmSignUpSubmit.observers.length > 0) {
      this.onConfirmSignUpSubmit.emit(formValues);
    } else {
      this.send({
        type: 'SUBMIT',
        data: formValues
      });
    }
  }
}
