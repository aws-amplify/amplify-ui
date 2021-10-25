import { Logger } from 'aws-amplify';
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
// TODO: import from '@/services/...'
import { StateMachineService } from '../../../../services/state-machine.service';
import { AuthPropService } from '../../../../services/authenticator-context.service';
import { Subscription } from 'xstate';
import { AuthMachineState, getActorState, SignInState } from '@aws-amplify/ui';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('SignIn');

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';
  @Input() public headerText = translate('Sign in to your account');

  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public isPending = false;

  // translated phrases
  public forgotPasswordText = translate('Forgot your password? ');
  public signInButtonText = translate('Sign in');

  private authSubscription: Subscription;

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('signIn.edit');
  }

  public get context() {
    const { change, resetPassword, signUp, submit } =
      this.stateMachine.services;
    const remoteError = this.remoteError;
    return { change, remoteError, resetPassword, signUp, submit };
  }

  toResetPassword(): void {
    this.stateMachine.send('RESET_PASSWORD');
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.stateMachine.send({
      type: 'SUBMIT',
    });
  }
}
