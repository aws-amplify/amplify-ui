import { Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
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
import { AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignUp');
@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html'
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @Input() headerText = 'Create a new account';
  @Input() onSignUp: OnSubmitHook;
  @HostBinding('attr.data-ui-sign-up') dataAttr = '';

  private authSubscription: Subscription;
  public customComponents: Record<string, TemplateRef<any>>;
  public loading = false;
  public context = {
    $implicit: {
      errors: () => this.contextService.formError
    }
  };

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
    this.onSignUp = this.contextService.props.signUp.onSignUp;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private onStateUpdate(state: AuthMachineState): void {
    if (state.event.type.includes('error.platform.signUp')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
      this.contextService.formError = { cross_field: [message] };
    }
    this.loading = false;
  }

  get formError(): FormError {
    return this.contextService.formError;
  }

  send(event: Event<any>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    this.contextService.formError = {};
    $event.preventDefault();
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries()) as AuthFormData;
    logger.log('Sign up form submitted with', formValues);

    if (!this.onSignUp) this.onSignUp = () => ({}); // no-op
    const { data, error } = this.onSignUp({ ...formValues });
    if (error && Object.keys(error).length > 0) {
      this.contextService.formError = error;
      return;
    }
    const param = data && Object.keys(data).length > 0 ? data : formValues;

    this.loading = true;
    this.send({
      type: 'SUBMIT',
      data: param
    });
  }

  onChange(): void {
    console.log('form changed');
  }

  toSignIn(): void {
    this.stateMachine.authService.send('SIGN_IN');
  }
}
