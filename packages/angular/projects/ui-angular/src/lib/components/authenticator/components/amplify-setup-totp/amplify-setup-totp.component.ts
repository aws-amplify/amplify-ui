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
import { AuthenticatorService } from '../../../../services/state-machine.service';
import { AuthPropService } from '../../../../services/authenticator-context.service';
import { translate } from '@aws-amplify/ui';

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
  public headerText = translate('Setup TOTP');
  public qrCodeSource = '';

  private authSubscription: Subscription;

  // translated texts
  public backToSignInText = translate('Back to Sign In');
  public confirmText = translate('Confirm');

  constructor(
    private authService: AuthenticatorService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authService.subscribe((state) => {
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
    const { change, submit } = this.authService.services;
    const remoteError = this.remoteError;
    const user = this.authService.user;
    return { change, remoteError, submit, user };
  }

  async generateQRCode() {
    // TODO: This should be handled in core.
    const state = this.authService.authState;
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
    // TODO: handle form data within the state machine
    const formData = new FormData(event.target as HTMLFormElement);
    this.authService.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }

  toSignIn(): void {
    this.authService.send('SIGN_IN');
  }
}
