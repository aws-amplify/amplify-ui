import { Component, HostBinding, Input } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'amplify-text-field',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() fieldId: string = `amplify-field-${nanoid(12)}`;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() type: string;
  @Input() labelHidden = false;
  @Input() hasError: boolean;
  @Input() describedBy: string;

  @HostBinding('style.display') display = 'contents';
}
