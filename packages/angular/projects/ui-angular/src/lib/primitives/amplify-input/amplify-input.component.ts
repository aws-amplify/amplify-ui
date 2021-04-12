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
  isInputType,
  FormError
} from '../../common';
import { AuthenticatorContextService } from '../../services';

/**
 * Contains an input element and its label. Intended to be used with
 * Angular Reactive Form
 */
@Component({
  selector: 'amplify-input',
  templateUrl: './amplify-input.component.html',
  viewProviders: [
    // https://stackoverflow.com/a/46452442/10103143
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class AmplifyInputComponent {
  @Input() name: AuthAttribute;
  // TODO: Separate entry for id
  @Input() type: InputType;
  @Input() required = false;
  @Input() placeholder: string;
  @Input() label: string;

  constructor(private contextService: AuthenticatorContextService) {}

  get attributeMap(): Record<AuthAttribute, AttributeInfo> {
    return getAttributeMap();
  }

  get error(): FormError {
    return this.contextService.formError;
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
