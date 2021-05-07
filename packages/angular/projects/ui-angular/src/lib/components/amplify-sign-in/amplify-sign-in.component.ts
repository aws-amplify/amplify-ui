import { Logger } from '@aws-amplify/core';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  AuthenticatorContextService,
  StateMachineService
} from '../../services';
import { AuthFormData, FormError, OnSubmitHook } from '../../common';
import { Event, Subscription } from 'xstate';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignIn');

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AmplifySignInComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @HostBinding('attr.data-ui-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public loading = false;
  public customComponents: Record<string, TemplateRef<any>> = {};
  private authSubscription: Subscription;
  public context = () => ({
    errors: this.contextService.formError
  });

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

    // attach sign in hooks
    const props = this.contextService.props.signIn;
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    if (state.event.type.includes('error.platform.signIn')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
      this.loading = false;
    }
  }

  get formError(): FormError {
    return this.contextService.formError;
  }

  toSignUp(): void {
    this.stateMachine.authService.send('SIGN_UP');
  }

  send(event: Event<AuthEvent>): void {
    this.stateMachine.authService.send(event);
  }

  onInput($event) {
    $event.preventDefault();
    this.send({
      type: 'INPUT',
      data: $event
    });
  }

  async onSubmit($event): Promise<void> {
    $event.preventDefault();
    this.contextService.formError = {};

    // get form data
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries()) as AuthFormData;
    logger.log('Sign in form submitted with', formValues);

    this.loading = true; // disable inputs

    this.send({
      type: 'SUBMIT',
      data: formValues
    });
  }
}
