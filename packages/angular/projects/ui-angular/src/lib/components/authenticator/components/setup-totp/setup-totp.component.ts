import { Component, HostBinding, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { Auth, Logger } from 'aws-amplify';
import {
  FormFields,
  FormFieldsArray,
  getActorContext,
  getFormDataFromEvent,
  SignInContext,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

const logger = new Logger('SetupTotp');

@Component({
  selector: 'amplify-setup-totp',
  templateUrl: './setup-totp.component.html',
})
export class SetupTotpComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-setup-totp') dataAttr = '';
  public headerText = translate('Setup TOTP');
  public qrCodeSource = '';
  public secretKey = '';
  public copyTextLabel = translate('COPY');

  // translated texts
  public backToSignInText = translate('Back to Sign In');
  public confirmText = translate('Confirm');
  public sortedFormFields: FormFieldsArray;
  public formOverrides: FormFields;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.generateQRCode();
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  async generateQRCode() {
    // TODO: This should be handled in core.
    const state = this.authenticator.authState;
    const actorContext = getActorContext(state) as SignInContext;
    const { user } = actorContext;
    try {
      this.secretKey = await Auth.setupTOTP(user);
      const issuer = this.formOverrides?.['QR']?.totpIssuer ?? 'AWSCognito';
      const username =
        this.formOverrides?.['QR']?.totpUsername ?? user.username;
      const totpCode = `otpauth://totp/${issuer}:${username}?secret=${this.secretKey}&issuer=${issuer}`;

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
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }

  copyText(): void {
    navigator.clipboard.writeText(this.secretKey);
    this.copyTextLabel = translate('COPIED');
  }
}
