import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  translate,
  hasTranslation,
  getFormDataFromEvent,
  FormFieldsArray,
  getSortedFormFields,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';

  // translated phrases
  // Support backwards compatibility for legacy key with trailing space
  public forgotPasswordText = !hasTranslation('Forgot your password? ')
    ? translate('Forgot your password?')
    : translate('Forgot your password? ');
  public signInButtonText = translate('Sign in');
  public sortedFormFields: FormFieldsArray;

  constructor(public authenticator: AuthenticatorService) {}

  public get context() {
    return this.authenticator.slotContext;
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
}
