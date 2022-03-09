import { Component, HostBinding, Input } from '@angular/core';
import { SortedFormFields } from '@aws-amplify/ui';

/**
 * Sorts the given formFields, then renders them in order.
 */
@Component({
  selector: 'amplify-base-form-fields',
  templateUrl: './base-form-fields.component.html',
})
export class BaseFormFieldsComponent {
  @Input() sortedFormFields: SortedFormFields; // formFields to sort and render
  @HostBinding('style.display') display = 'contents';
}
