import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  FormFieldsArray,
  getFormDataFromEvent,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

const { getResetYourPasswordText, getSendCodeText, getBackToSignInText } =
  authenticatorTextUtil;

@Component({
  selector: 'amplify-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ForgotPasswordComponent {
  @HostBinding('attr.data-amplify-authenticator-forgotpassword') dataAttr = '';
  @Input() public headerText = getResetYourPasswordText();

  // translated texts
  public sendCodeText = getSendCodeText();
  public backToSignInText = getBackToSignInText();
  public sortedFormFields: FormFieldsArray;

  authenticator = inject(AuthenticatorService);

  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
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
}
