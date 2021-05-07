import { Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { AuthFormData, FormError, OnSubmitHook } from '../../common';
import {
  AuthenticatorContextService,
  StateMachineService
} from '../../services';
import { Subscription, Event } from 'xstate';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignUp');
@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html'
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @Input() headerText = 'Create a new account';
  @HostBinding('attr.data-ui-sign-up') dataAttr = '';

  private authSubscription: Subscription;
  public customComponents: Record<string, TemplateRef<any>>;
  public loading = false;
  public context = () => ({
    errors: this.contextService.formError
  });
  public onSignUpInput = new EventEmitter<any>();
  public onSignUpSubmit = new EventEmitter<any>();

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthenticatorContextService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe(state =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.contextService.formError = {};
    this.customComponents = this.contextService.customComponents;
    if (this.contextService.props?.signUp) {
      const signUpProps = this.contextService.props.signUp;
      this.onSignUpInput = signUpProps.onSignUpInput;
      this.onSignUpSubmit = signUpProps.onSignUpSubmit;
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
    }
    if (state.event.type === 'INPUT') {
      console.log(this.onSignUpInput);
      this.onSignUpInput.emit(formValues);
    }
    this.loading = false;
  }

  get formError(): FormError {
    return this.contextService.formError;
  }

  send(event: Event<AuthEvent>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    this.contextService.formError = {};
    $event.preventDefault();
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries()) as AuthFormData;
    logger.log('Sign up form submitted with', formValues);

    if (this.onSignUpSubmit.observers.length > 0) {
      const formValues = this.stateMachine.authState.context.formValues;
      this.onSignUpSubmit.emit(formValues);
    } else {
      this.loading = true;
      this.send({
        type: 'SUBMIT',
        data: formValues
      });
    }
  }

  onInput($event): void {
    $event.preventDefault();
    this.send({
      type: 'INPUT',
      data: $event
    });
  }

  toSignIn(): void {
    this.stateMachine.authService.send('SIGN_IN');
  }
}
