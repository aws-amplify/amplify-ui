import { Component, ContentChild, Input, SimpleChanges } from '@angular/core';
import { InputDirective } from '../../text-field';
import { PasswordDirective } from '../password-field-directive/password-field.directive';

const $COMPONENT_SELECTOR: string = 'amplify-password-poc';
const showIconPath: string =
  'M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z';
const hidIconPath: string =
  'M12 6.0002C15.79 6.0002 19.17 8.1302 20.82 11.5002C20.23 12.7202 19.4 13.7702 18.41 14.6202L19.82 16.0302C21.21 14.8002 22.31 13.2602 23 11.5002C21.27 7.1102 17 4.0002 12 4.0002C10.73 4.0002 9.51 4.2002 8.36 4.5702L10.01 6.2202C10.66 6.0902 11.32 6.0002 12 6.0002ZM10.93 7.14019L13 9.2102C13.57 9.4602 14.03 9.9202 14.28 10.4902L16.35 12.5602C16.43 12.2202 16.49 11.8602 16.49 11.4902C16.5 9.0102 14.48 7.0002 12 7.0002C11.63 7.0002 11.28 7.05019 10.93 7.14019ZM2.01 3.8702L4.69 6.5502C3.06 7.8302 1.77 9.5302 1 11.5002C2.73 15.8902 7 19.0002 12 19.0002C13.52 19.0002 14.98 18.7102 16.32 18.1802L19.74 21.6002L21.15 20.1902L3.42 2.4502L2.01 3.8702ZM9.51 11.3702L12.12 13.9802C12.08 13.9902 12.04 14.0002 12 14.0002C10.62 14.0002 9.5 12.8802 9.5 11.5002C9.5 11.4502 9.51 11.4202 9.51 11.3702V11.3702ZM6.11 7.97019L7.86 9.7202C7.63 10.2702 7.5 10.8702 7.5 11.5002C7.5 13.9802 9.52 16.0002 12 16.0002C12.63 16.0002 13.23 15.8702 13.77 15.6402L14.75 16.6202C13.87 16.8602 12.95 17.0002 12 17.0002C8.21 17.0002 4.83 14.8702 3.18 11.5002C3.88 10.0702 4.9 8.89019 6.11 7.97019Z';

@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'password-field.component.html',
})
export class AmplifyPasswordFieldComponent {
  @Input() describedBy: string;
  @Input() labelHidden: boolean = false;
  @Input() hasError: boolean = false;

  passwordIconStr: string = 'Password is hidden';
  showPasswordval: boolean = false;
  iconpath: string = showIconPath;

  @ContentChild(PasswordDirective) childInput: PasswordDirective | undefined;

  public inputId = '';

  constructor() {}

  ngAfterContentInit(): void {
    // getting data from child input
    this.inputId = this.childInput?.id;

    // send data to child input
    // note: this is still not dynamic, so we still need a change detction strategy here.
    // this can be implemented later for the purpose of POC.
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

  showPassword(): void {
    this.childInput.showPassword = !this.childInput.showPassword;
    this.showPasswordval = this.childInput.showPassword;
    this.passwordIconStr = this.childInput.showPassword
      ? 'Password is shown'
      : 'Password is hidden';

    this.iconpath = this.childInput.showPassword ? hidIconPath : showIconPath;
  }
}
