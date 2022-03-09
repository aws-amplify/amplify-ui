import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  SortedFormFields,
  getFormDataFromEvent,
  translate,
  getDefaultFormFields,
  hasTranslation,
  applyDefaults,
  sortFormFields,
  getActorContext,
} from '@aws-amplify/ui';
@Component({
  selector: 'amplify-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
})
export class ConfirmSignUpComponent implements OnInit {
  @Input() headerText = translate('Confirm Sign Up');

  @HostBinding('attr.data-amplify-authenticator-confirmsignup') dataAttr = '';

  // translated texts
  public resendCodeText = translate('Resend Code');
  public confirmText = translate('Confirm');
  public emailMessage = translate(
    'Your code is on the way. To log in, enter the code we emailed to'
  );
  public textedMessage = translate(
    'Your code is on the way. To log in, enter the code we texted to'
  );
  public defaultMessage = translate(
    'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
  );
  public minutesMessage = translate('It may take a minute to arrive.');

  public formFields: SortedFormFields;

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setFormFields();
  }

  public setFormFields() {
    /**
     * @todo(breaking): Angular has different placholder here from other frameworks.
     *
     * Translating here in a backwards-compatible manner, but should be resolved in next major version.
     */
    const state = this.authenticator.authState;

    // backwards compatible placeholder text
    const placeholder = !hasTranslation('Confirmation Code')
      ? translate('Enter your code') // prioritize new placeholder
      : translate('Confirmation Code'); // legacy placeholder
    let defaultFormFields = getDefaultFormFields('confirmSignUp', state);

    if (defaultFormFields.confirmation_code.placeholder) {
      defaultFormFields.confirmation_code.placeholder = placeholder;
    }

    const customFormFields =
      getActorContext(state).formFields?.confirmSignUp || {};

    const formFields = applyDefaults(defaultFormFields, customFormFields);
    this.formFields = sortFormFields(formFields);
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  public get confirmSignUpHeading(): string {
    const { codeDeliveryDetails: { DeliveryMedium } = {} } = this.authenticator;
    return DeliveryMedium === 'EMAIL'
      ? translate('We Emailed You')
      : DeliveryMedium === 'SMS'
      ? translate('We Texted You')
      : translate('We Sent A Code');
  }

  public get subtitleText(): string {
    const { codeDeliveryDetails: { DeliveryMedium, Destination } = {} } =
      this.authenticator;
    return DeliveryMedium === 'EMAIL'
      ? `${this.emailMessage} ${Destination}. ${this.minutesMessage}`
      : DeliveryMedium === 'SMS'
      ? `${this.textedMessage} ${Destination}. ${this.minutesMessage}`
      : translate(`${this.defaultMessage}`);
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
