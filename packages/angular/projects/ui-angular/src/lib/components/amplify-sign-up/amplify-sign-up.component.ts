import { Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AuthFormData, FormError, OnSubmitHook } from '../../common';
import {
  AuthenticatorContextService,
  StateMachineService,
} from '../../services';
import { Subscription, Event } from 'xstate';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignUp');
@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  // Custom events
  public onSignUpInput = new EventEmitter<any>();
  public onSignUpSubmit = new EventEmitter<any>();

  @HostBinding('attr.data-ui-sign-up') dataAttr = '';
  @Input() headerText = 'Create a new account';
  private authSubscription: Subscription;
  public customComponents: Record<string, TemplateRef<any>>;
  public context = () => ({
    errors: this.contextService.formError,
  });

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthenticatorContextService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.contextService.formError = {};
    this.customComponents = this.contextService.customComponents;
    const props = this.contextService.props?.signUp;
    if (props) {
      this.onSignUpInput = props.onSignUpInput;
      this.onSignUpSubmit = props.onSignUpSubmit;
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private onStateUpdate(state: AuthMachineState): void {
    const formValues = state.context.formValues;
    if (state.matches('signUp.edit.error')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
    } else if (state.event.type === 'INPUT') {
      this.onSignUpInput.emit(formValues);
    }
  }

  get formError(): FormError {
    return this.contextService.formError;
  }

  public isLoading(): boolean {
    return !this.stateMachine.authState.matches('signUp.edit');
  }

  send(event: Event<AuthEvent>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    this.contextService.formError = {};
    $event.preventDefault();
    const formValues = this.stateMachine.authState.context.formValues;
    logger.log('Sign up form submitted with', formValues);

    if (this.onSignUpSubmit.observers.length > 0) {
      this.onSignUpSubmit.emit(formValues);
    } else {
      this.send({
        type: 'SUBMIT',
        data: formValues,
      });
    }
  }

  onInput($event): void {
    $event.preventDefault();
    const { name, value } = $event.target;
    this.send({
      type: 'INPUT',
      data: { name, value },
    });
  }

  toSignIn(): void {
    this.stateMachine.authService.send('SIGN_IN');
  }
}
