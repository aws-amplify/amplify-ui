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
  SortedFormFields,
  getSortedFormFields,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';

  // translated phrases
  // Support backwards compatibility for legacy key with trailing space
  public forgotPasswordText = !hasTranslation('Forgot your password? ')
    ? translate('Forgot your password?')
    : translate('Forgot your password? ');
  public signInButtonText = translate('Sign in');
  public formFields: SortedFormFields;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formFields = getSortedFormFields('signIn', _state);
  }

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
