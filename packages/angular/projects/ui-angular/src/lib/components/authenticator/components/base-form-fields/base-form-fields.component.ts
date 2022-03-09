import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  FormFieldComponents,
  hasTranslation,
  translate,
  getDefaultFormFields,
  getActorContext,
  FormFieldsArray,
  getSortedFormFields,
  applyDefaults,
  sortFormFields,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

/**
 * Sorts the given formFields, then renders them in order.
 */
@Component({
  selector: 'amplify-base-form-fields',
  templateUrl: './base-form-fields.component.html',
})
export class BaseFormFieldsComponent implements OnInit {
  @Input() route: FormFieldComponents; // formFields to sort and render
  @HostBinding('style.display') display = 'contents';
  public formFields: FormFieldsArray = [];

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const state = this.authenticator.authState;
    this.formFields = getSortedFormFields(this.route, state);

    if (this.route === 'confirmSignUp') {
      this.handleConfirmSignUp();
    }
  }

  private handleConfirmSignUp() {
    /**
     * @todo(breaking): Angular `confirmSignUp` has different placholder here from other frameworks.
     *
     * Translating here in a backwards-compatible manner, but should be resolved in next major version.
     */

    const state = this.authenticator.authState;

    // backwards compatible placeholder text
    const placeholder = !hasTranslation('Confirmation Code')
      ? translate('Enter your code') // prioritize new placeholder
      : translate('Confirmation Code'); // legacy placeholder

    let defaultFormFields = getDefaultFormFields(this.route, state);

    if (defaultFormFields.confirmation_code.placeholder) {
      defaultFormFields.confirmation_code.placeholder = placeholder;
    }

    const customFormFields =
      getActorContext(state).formFields?.confirmSignUp || {};

    const newFormFields = applyDefaults(defaultFormFields, customFormFields);
    this.formFields = sortFormFields(newFormFields);
  }
}
