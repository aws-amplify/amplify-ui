import { Component, Input } from '@angular/core';

@Component({
  selector: 'amplify-text-field',
  templateUrl: './amplify-text-field.component.html',
})
export class AmplifyTextFieldComponent {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() id: string;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() type: string;
}
