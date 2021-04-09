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
  AttributeInfo,
  isInputType
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
export class AmplifyFormFieldComponent {
  @Input() name: AuthAttribute;
  // TODO: Separate entry for id
  @Input() type: InputType;
  @Input() required = false;
  @Input() errors: ValidationErrors;
  @Input() placeholder: string;
  @Input() label: string;

  get attributeMap(): Record<AuthAttribute, AttributeInfo> {
    return getAttributeMap();
  }

  // infers what the `type` of underlying input element should be.
  inferInputType(): InputType {
    if (this.type) {
      // if type is explicitly defined, use that.
      return this.type;
    } else if (this.name && isInputType(this.name)) {
      // if the input name is also a valid input type, use that.
      // e.g. type of <input name="password"> will be password.
      return this.name;
    } else {
      return 'text';
    }
  }
}
