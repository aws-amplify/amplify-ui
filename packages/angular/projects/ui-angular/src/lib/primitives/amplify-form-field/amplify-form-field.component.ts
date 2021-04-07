import { AfterContentInit, Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ValidationErrors
} from '@angular/forms';
import {
  AuthAttribute,
  InputType,
  getAttributeMap,
  AttributeInfo
} from '../../common';

/**
 * Contains an input element and its label. Intended to be used with
 * Angular Reactive Form
 */
@Component({
  selector: 'amplify-form-field',
  templateUrl: './amplify-form-field.component.html',
  viewProviders: [
    // https://stackoverflow.com/a/46452442/10103143
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class AmplifyFormFieldComponent implements AfterContentInit {
  @Input() name: AuthAttribute = null;
  // TODO: Separate entry for id
  @Input() type: InputType = 'text';
  @Input() required = false;
  @Input() formGroup: FormGroup;
  @Input() errors: ValidationErrors;

  ngAfterContentInit() {
    console.log(this.required);
  }

  get attributeMap(): Record<AuthAttribute, AttributeInfo> {
    return getAttributeMap();
  }
}
