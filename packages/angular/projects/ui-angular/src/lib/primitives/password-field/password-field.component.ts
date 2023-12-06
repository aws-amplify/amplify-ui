import { Component, EventEmitter, Input, Output } from '@angular/core';
import { translate, ComponentClassName } from '@aws-amplify/ui';
import { nanoid } from 'nanoid';
import { classNames } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-password-field',
  templateUrl: './password-field.component.html',
})
export class PasswordFieldComponent {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() fieldId = `amplify-field-${nanoid(12)}`;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() labelHidden = false;
  @Input() hasError: boolean;
  @Input() describedBy: string;
  @Output() setBlur = new EventEmitter<Event>();

  public type: 'text' | 'password' = 'password';

  public showPassword = false;
  public showPasswordButtonlabel = translate('Show password');

  // re-export utilities so that template html can use them
  public classnames = classNames;
  public ComponentClassName = ComponentClassName;

  togglePasswordText(): void {
    this.showPassword = !this.showPassword;
    this.showPasswordButtonlabel = this.showPassword
      ? translate('Hide password')
      : translate('Show password');
    this.type = this.showPassword ? 'text' : 'password';
  }
}
