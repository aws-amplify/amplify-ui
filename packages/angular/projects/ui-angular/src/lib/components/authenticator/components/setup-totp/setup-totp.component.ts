import { Component, HostBinding, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import {
  FormFieldsArray,
  getActorContext,
  getFormDataFromEvent,
  getTotpCodeURL,
  SignInContext,
  authenticatorTextUtil,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

const logger = new Logger('SetupTotp');

const {
  getSetupTotpText,
  getCopyText,
  getBackToSignInText,
  getConfirmText,
  getCopiedText,
} = authenticatorTextUtil;

@Component({
  selector: 'amplify-setup-totp',
  templateUrl: './setup-totp.component.html',
})
export class SetupTotpComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-setup-totp') dataAttr = '';
  public headerText = getSetupTotpText();
  public qrCodeSource = '';
  public totpSecretCode = '';
  public copyTextLabel = getCopyText();

  // translated texts
  public backToSignInText = getBackToSignInText();
  public confirmText = getConfirmText();
  public sortedFormFields: FormFieldsArray;

  constructor(public authenticator: AuthenticatorService) {}

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  async ngOnInit(): Promise<void> {
    await this.generateQRCode();
  }

  async generateQRCode(): Promise<void> {
    const { authState: state, totpSecretCode, username } = this.authenticator;
    const { formFields } = getActorContext(state) as SignInContext;
    const { totpIssuer = 'AWSCognito', totpUsername = username } =
      formFields?.setupTotp?.QR ?? {};

    this.totpSecretCode = totpSecretCode;

    try {
      const totpCode = getTotpCodeURL(
        totpIssuer,
        totpUsername,
        this.totpSecretCode
      );

      logger.info('totp code was generated:', totpCode);
      this.qrCodeSource = await QRCode.toDataURL(totpCode);
    } catch (err) {
      logger.error(err);
    }
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }

  copyText(): void {
    navigator.clipboard.writeText(this.totpSecretCode);
    this.copyTextLabel = getCopiedText();
  }
}
