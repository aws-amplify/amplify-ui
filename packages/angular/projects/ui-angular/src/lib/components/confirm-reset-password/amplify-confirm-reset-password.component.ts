import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  ResetPasswordContext,
  SignInState,
  ValidationError,
} from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthPropService } from '../../services/authenticator-context.service';
import { StateMachineService } from '../../services/state-machine.service';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-confirm-reset-password',
  templateUrl: './amplify-confirm-reset-password.component.html',
})
export class ConfirmResetPasswordComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';
  @Input() public headerText = translate('Reset your password');

  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public validationError: ValidationError;
  public isPending = false;
  private authSubscription: Subscription;

  // translated strings
  public sendCodeText = translate('Send Code');
  public backToSignInText = translate('Back to Sign In');
  public lostCodeText = translate('Lost your code? ');
  public resendCodeText = translate('Resend Code');

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit() {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    const actorContext: ResetPasswordContext = getActorContext(state);
    this.validationError = actorContext.validationError;
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('confirmResetPassword.edit');
  }

  public get context() {
    const { change, resend, signIn, submit } = this.stateMachine.services;
    const remoteError = this.remoteError;
    return { change, resend, remoteError, signIn, submit };
  }

  toSignIn(): void {
    this.stateMachine.send('SIGN_IN');
  }

  resend() {
    this.stateMachine.send('RESEND');
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.stateMachine.send('SUBMIT');
  }
}
