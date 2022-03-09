import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormFields, SortedFormFields, sortFormFields } from '@aws-amplify/ui';

/**
 * Sorts the given formFields, then renders them in order.
 */
@Component({
  selector: 'amplify-base-form-fields',
  templateUrl: './base-form-fields.component.html',
})
export class BaseFormFieldsComponent implements OnInit {
  @Input() formFields: FormFields; // formFields to sort and render
  @HostBinding('style.display') display = 'contents';

  public sortedFormFields: SortedFormFields;

  ngOnInit(): void {
    this.sortedFormFields = sortFormFields(this.formFields);
  }
}
