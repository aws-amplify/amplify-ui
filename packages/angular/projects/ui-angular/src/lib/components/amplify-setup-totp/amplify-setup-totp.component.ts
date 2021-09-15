import {
  AfterContentInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'xstate';
import QRCode from 'qrcode';
import { Auth, Logger } from 'aws-amplify';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';
import { StateMachineService } from '../../services/state-machine.service';
import { AuthPropService } from '../../services/authenticator-context.service';
import { translate } from '../../common';

const logger = new Logger('SetupTotp');

@Component({
  selector: 'amplify-setup-totp',
  templateUrl: './amplify-setup-totp.component.html',
})
export class AmplifySetupTotpComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-setup-totp')
  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public isPending = false;
  public headerText = 'Setup TOTP';
  public qrCodeSource = '';

  private authSubscription: Subscription;

  // translated texts
  public backToSignInText = translate('Back to Sign In');
  public confirmText = translate('Confirm');

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) => {
      this.onStateUpdate(state);
    });
    this.generateQRCode();
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('setupTOTP.edit');
  }

  public get context() {
    const { change, submit } = this.stateMachine.services;
    const remoteError = this.remoteError;
    const user = this.stateMachine.user;
    return { change, remoteError, submit, user };
  }

  async generateQRCode() {
    // TODO: This should be handled in core.
    const state = this.stateMachine.authState;
    const actorContext: SignInContext = getActorContext(state);
    const { user } = actorContext;
    try {
      const secretKey = await Auth.setupTOTP(user);
      const issuer = 'AWSCognito';
      const totpCode = `otpauth://totp/${issuer}:${user.username}?secret=${secretKey}&issuer=${issuer}`;

      logger.info('totp code was generated:', totpCode);
      this.qrCodeSource = await QRCode.toDataURL(totpCode);
    } catch (err) {
      this.remoteError = err.message ?? err;
      logger.error(err);
    }
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // TODO: handle form data within the state machine
    const formData = new FormData(event.target as HTMLFormElement);
    this.stateMachine.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }

  toSignIn(): void {
    this.stateMachine.send('SIGN_IN');
  }
}
