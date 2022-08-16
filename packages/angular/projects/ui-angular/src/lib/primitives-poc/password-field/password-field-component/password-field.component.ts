import { Component, ContentChild, Input, SimpleChanges } from '@angular/core';
import { PasswordDirective } from '../password-field-directive/password-field.directive';
import { ComponentConstants } from '../constants';
const $COMPONENT_SELECTOR: string = 'amplify-password-poc';
@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'password-field.component.html',
})
export class AmplifyPasswordFieldComponent {
  @Input() describedBy: string;
  @Input() labelHidden: boolean = false;
  @Input() hasError: boolean = false;

  passwordIconStr: string = 'Password is hidden';
  showPasswordVal: boolean = false;
  iconpath: string = ComponentConstants.showIconPath;

  @ContentChild(PasswordDirective) childInput: PasswordDirective;

  public inputId = '';

  ngAfterContentInit(): void {
    // getting data from child input
    this.inputId = this.childInput?.id;

    // send data to child input
    this.childInput.hasError = this.hasError;
    this.childInput.ariaDescribedBy = this.describedBy;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (
        this.childInput &&
        key === 'hasError' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
        this.childInput.hasError = this.hasError;
      }
      if (
        this.childInput &&
        key === 'describedBy' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
        this.childInput.ariaDescribedBy = this.describedBy;
      }
    }
  }

  togglePassword(): void {
    this.childInput.showPassword = !this.childInput.showPassword;
    this.showPasswordVal = this.childInput.showPassword;
    this.passwordIconStr = this.childInput.showPassword
      ? 'Password is shown'
      : 'Password is hidden';

    this.iconpath = this.childInput.showPassword
      ? ComponentConstants.hidIconPath
      : ComponentConstants.showIconPath;
  }
}
