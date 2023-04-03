import { Component, HostBinding, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { Logger } from 'aws-amplify';
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
  getSetupTOTPText,
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
  public headerText = getSetupTOTPText();
  public qrCodeSource = '';
  public totpSecretCode = '';
  public copyTextLabel = getCopyText();

  // translated texts
  public backToSignInText = getBackToSignInText();
  public confirmText = getConfirmText();
  public sortedFormFields: FormFieldsArray;

  constructor(public authenticator: AuthenticatorService) {}

  async ngOnInit(): Promise<void> {
    await this.generateQRCode();
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  async generateQRCode() {
    const { authState: state, totpSecretCode, user } = this.authenticator;
    const { formFields } = getActorContext(state) as SignInContext;
    const { totpIssuer = 'AWSCognito', totpUsername = user?.username } =
      formFields?.setupTOTP?.QR ?? {};

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
    navigator.clipboard.writeText(this.totpSecretCode);
    this.copyTextLabel = getCopiedText();
  }
}
