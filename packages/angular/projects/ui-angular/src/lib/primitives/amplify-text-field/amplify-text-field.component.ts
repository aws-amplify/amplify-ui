import { Component, Input } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'amplify-text-field',
  templateUrl: './amplify-text-field.component.html',
})
export class AmplifyTextFieldComponent {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() fieldId: string = `amplify-field-${nanoid(12)}`;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() type: string;
}
