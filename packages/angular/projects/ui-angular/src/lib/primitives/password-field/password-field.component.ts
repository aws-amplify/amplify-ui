import { Component, EventEmitter, Input, Output } from '@angular/core';
import { translate } from '@aws-amplify/ui';
import { nanoid } from 'nanoid';

@Component({
  selector: 'amplify-password-field',
  templateUrl: './password-field.component.html',
})
export class PasswordFieldComponent {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() fieldId: string = `amplify-field-${nanoid(12)}`;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() labelHidden = false;
  @Output() setBlur = new EventEmitter<Event>();

  public type: 'text' | 'password' = 'password';

  public showPassword = false;
  public showPasswordButtonlabel = translate('Show password');

  togglePasswordText() {
    this.showPassword = !this.showPassword;
    this.showPasswordButtonlabel = this.showPassword
      ? translate('Show password')
      : translate('Hide password');
    this.type = this.showPassword ? 'text' : 'password';
  }
}
