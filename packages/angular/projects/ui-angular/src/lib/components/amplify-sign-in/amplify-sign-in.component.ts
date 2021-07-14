import { Logger } from '@aws-amplify/core';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AuthPropService, StateMachineService } from '../../services';
import { FormError } from '../../common';
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
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';
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
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    if (state.event.type.includes('signIn.edit.error')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
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

    this.send({
      type: 'SUBMIT',
      data: formValues,
    });
  }
}
