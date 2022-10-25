import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  FormFieldComponents,
  FormFieldsArray,
  getSortedFormFields,
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
  }
}
