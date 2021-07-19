import { Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AuthPropService, StateMachineService } from '../../services';
import { Subscription, Event } from 'xstate';
import { AuthEvent, AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignUp');
@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';
  @Input() headerText = 'Create a new account';
  private authSubscription: Subscription;
  public customComponents: Record<string, TemplateRef<any>>;
  public context = () => ({});

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
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private onStateUpdate(state: AuthMachineState): void {
    if (state.matches('signUp.edit.error')) {
      const message = state.event.data?.message;
      logger.info('An error was encountered while signing up:', message);
    }
  }

  public isLoading(): boolean {
    return !this.stateMachine.authState.matches('signUp.edit');
  }

  send(event: Event<AuthEvent>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    $event.preventDefault();
    const formValues = this.stateMachine.authState.context.formValues;
    logger.log('Sign up form submitted with', formValues);

    this.send({
      type: 'SUBMIT',
      data: formValues,
    });
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
