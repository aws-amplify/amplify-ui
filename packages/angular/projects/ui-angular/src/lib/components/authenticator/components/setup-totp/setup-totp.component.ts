import { Component, HostBinding, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { Auth, Logger } from 'aws-amplify';
import { getActorContext, SignInContext } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('SetupTotp');

@Component({
  selector: 'amplify-setup-totp',
  templateUrl: './setup-totp.component.html',
})
export class AmplifySetupTotpComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-setup-totp') dataAttr = '';
  public headerText = translate('Setup TOTP');
  public qrCodeSource = '';

  // translated texts
  public backToSignInText = translate('Back to Sign In');
  public confirmText = translate('Confirm');

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.generateQRCode();
  }

  public get context() {
    const { updateForm, submitForm, error, user } = this.authenticator;
    return { updateForm, submitForm, error, user };
  }

  async generateQRCode() {
    // TODO: This should be handled in core.
    const state = this.authenticator.authState;
    const actorContext = getActorContext(state) as SignInContext;
    const { user } = actorContext;
    try {
      const secretKey = await Auth.setupTOTP(user);
      const issuer = 'AWSCognito';
      const totpCode = `otpauth://totp/${issuer}:${user.username}?secret=${secretKey}&issuer=${issuer}`;

      logger.info('totp code was generated:', totpCode);
      this.qrCodeSource = await QRCode.toDataURL(totpCode);
    } catch (err) {
      logger.error(err);
    }
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm();
  }
}
