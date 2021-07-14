import { Logger } from '@aws-amplify/core';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AuthPropService, StateMachineService } from '../../services';
import { AuthFormData, FormError, OnSubmitHook } from '../../common';
import { Event, Subscription } from 'xstate';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignIn');

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent
  implements AfterContentInit, OnInit, OnDestroy {
  // Custom events
  @Output() onSignInInput = new EventEmitter<AuthFormData>();
  @Output() onSignInSubmit = new EventEmitter<AuthFormData>();
  @HostBinding('attr.data-ui-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public customComponents: Record<string, TemplateRef<any>> = {};
  private authSubscription: Subscription;
  public context = () => ({
    errors: this.contextService.formError,
  });

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe(state =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.contextService.formError = {};
    this.customComponents = this.contextService.customComponents;

    // attach sign in hooks
    const props = this.contextService.props.signIn;
    if (props) {
      this.onSignInInput = props.onSignInInput;
      this.onSignInSubmit = props.onSignInSubmit;
    }
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const formValues = state.context.formValues;
    if (state.event.type.includes('signIn.edit.error')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
    } else if (state.event.type === 'INPUT') {
      this.onSignInInput.emit(formValues);
    }
  }

  get formError(): FormError {
    return this.contextService.formError;
  }

  public isLoading(): boolean {
    return !this.stateMachine.authState.matches('signIn.edit');
  }

  toSignUp(): void {
    this.send('SIGN_UP');
  }

  send(event: Event<AuthEvent>): void {
    this.stateMachine.authService.send(event);
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
    this.contextService.formError = {};

    const formValues = this.stateMachine.authState.context.formValues;
    logger.log('Sign in form submitted with', formValues);

    if (this.onSignInSubmit.observers.length > 0) {
      this.onSignInSubmit.emit(formValues);
    } else {
      this.send({
        type: 'SUBMIT',
        data: formValues,
      });
    }
  }
}
