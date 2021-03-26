import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { AuthAttribute, InputType, getAttributeMap } from '../../common';

/**
 * Contains an input element and its label. Intended to be used with
 * Angular Reactive Form
 */
@Component({
  selector: 'amplify-input',
  templateUrl: './amplify-input.component.html',
  viewProviders: [
    // https://stackoverflow.com/a/46452442/10103143
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class AmplifyInputComponent {
  @Input() name: AuthAttribute = null;
  // TODO: Separate entry for id
  @Input() type: InputType = 'text';
  @Input() required: boolean = false;

  get attributeMap() {
    return getAttributeMap();
  }
}
