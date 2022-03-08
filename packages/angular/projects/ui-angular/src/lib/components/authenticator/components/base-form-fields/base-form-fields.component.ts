import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormFields, SortedFormFields, sortFormfields } from '@aws-amplify/ui';

/**
 * Input interface opinionated for authenticator usage.
 *
 * TODO: Separate this component out to two parts -- 1) amplify-auth-input that
 * contains authenticator opinionated logic and 2) amplify-text-field primitive
 * that does not make any auth-related inference.
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
    this.sortedFormFields = sortFormfields(this.formFields);
    console.log(this.sortedFormFields);
  }
}
