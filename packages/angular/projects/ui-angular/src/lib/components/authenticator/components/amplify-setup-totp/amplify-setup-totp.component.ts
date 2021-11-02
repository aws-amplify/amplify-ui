import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
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
import { translate } from '@aws-amplify/ui';

const logger = new Logger('SetupTotp');

@Component({
  selector: 'amplify-setup-totp',
  templateUrl: './amplify-setup-totp.component.html',
})
export class AmplifySetupTotpComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-setup-totp') dataAttr = '';
  public remoteError = '';
  public isPending = false;
  public headerText = translate('Setup TOTP');
  public qrCodeSource = '';

  private authSubscription: Subscription;

  // translated texts
  public backToSignInText = translate('Back to Sign In');
  public confirmText = translate('Confirm');

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.authSubscription = this.authenticator.subscribe((state) => {
      this.onStateUpdate(state);
    });
    this.generateQRCode();
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
    const { change, submit } = this.authenticator.services;
    const remoteError = this.remoteError;
    const user = this.authenticator.user;
    return { change, remoteError, submit, user };
  }

  async generateQRCode() {
    // TODO: This should be handled in core.
    const state = this.authenticator.authState;
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
    this.authenticator.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // TODO: handle form data within the state machine
    const formData = new FormData(event.target as HTMLFormElement);
    this.authenticator.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }

  toSignIn(): void {
    this.authenticator.send('SIGN_IN');
  }
}
