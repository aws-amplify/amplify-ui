import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'xstate';
import { Logger } from 'aws-amplify';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/state-machine.service';
import { AuthPropService } from '../../../../services/authenticator-context.service';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('ForceNewPassword');

@Component({
  selector: 'amplify-force-new-password',
  templateUrl: './amplify-force-new-password.component.html',
})
export class AmplifyForceNewPasswordComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-forcenewpassword')
  dataAttr = '';
  @Input() public headerText = translate('Change Password');

  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public isPending = false;

  private authSubscription: Subscription;

  // translated texts
  public changePasswordText = translate('Change Password');
  public backToSignInText = translate('Back to Sign In');

  constructor(
    private authService: AuthenticatorService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authService.subscribe((state) =>
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
    this.isPending = actorState.matches({
      signUp: {
        submission: 'idle',
      },
    });
  }

  public get context() {
    const { change, signIn, submit } = this.authService.services;
    const user = this.authService.user;
    const remoteError = this.remoteError;
    return { change, remoteError, signIn, submit, user };
  }

  toSignIn(): void {
    this.authService.send('SIGN_IN');
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authService.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // consider stateMachine directly providing actorState / actorContext
    const state = this.authService.authState;
    const actorState: SignInContext = getActorContext(state);
    const { formValues } = actorState;

    this.authService.send({
      type: 'SUBMIT',
      data: formValues,
    });
  }
}
