import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { AuthInputAttributes } from '@aws-amplify/ui-core';
import { getAttributeMap } from '../../common';

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
  @Input() name: string;
  // TODO: Separate entry for id
  @Input() type: string;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() initialValue = '';
  @Input() disabled = false;

  constructor() {}

  get attributeMap(): AuthInputAttributes {
    return getAttributeMap();
  }

  // infers what the `type` of underlying input element should be.
  inferInputType(): string {
    return this.attributeMap[this.name]?.type ?? 'text';
  }
}
