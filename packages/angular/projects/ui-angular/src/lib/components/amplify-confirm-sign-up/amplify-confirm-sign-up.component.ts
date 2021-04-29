import { Component, HostBinding, TemplateRef } from '@angular/core';
import { AuthMachineState } from '@aws-amplify/ui-core';
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
  @HostBinding('attr.data-ui-sign-up') dataAttr = '';
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
    // TODO: alias for subscribe
    this.authSubscription = this.stateMachine.authService.subscribe(state =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.contextService.formError = {};
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    logger.log(
      'confirm sign up destroyed, unsubscribing from state machine...'
    );
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    if (state.event.type.includes('error.platform.confirmSignUp')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
      this.loading = false;
    }
  }

  get formError(): FormError {
    return this.contextService.formError;
  }

  send(event: Event<any>): void {
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

  async onSubmit($event): Promise<void> {
    this.contextService.formError = {};

    // get form data
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries()) as AuthFormData;
    logger.log('Confirm sign up form submitted with', formValues);

    const param = formValues;
    this.loading = true; // disable inputs

    this.send({
      type: 'SUBMIT',
      data: param
    });
  }
}
