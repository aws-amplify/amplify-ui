import { Component, Input } from '@angular/core';
import { translate } from '@aws-amplify/ui';

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
