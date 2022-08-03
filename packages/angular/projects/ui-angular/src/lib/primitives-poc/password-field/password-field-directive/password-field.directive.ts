import { Directive, HostBinding, Input } from '@angular/core';
import { nanoid } from 'nanoid';

const $Directive_Selector = '[amplify-password]';
@Directive({
  selector: $Directive_Selector,
})
export class PasswordDirective {
  private _id = nanoid(8);
  private _ariaDescribedBy: string = 'test';
  private _showPassword: boolean = false;

  @Input() set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled;
  }
  @HostBinding('disabled') _isDisabled = false;

  @Input() set isReadonly(isReadonly: boolean) {
    this._isReadonly = isReadonly;
  }
  @HostBinding('readonly') _isReadonly = false;

  public get ariaDescribedBy(): string {
    return this._ariaDescribedBy;
  }
  public set ariaDescribedBy(ariaDescribedBy: string) {
    this._ariaDescribedBy = ariaDescribedBy;
  }

  public get showPassword(): boolean {
    return this._showPassword;
  }
  public set showPassword(showPassword: boolean) {
    this._showPassword = showPassword;
  }

  @HostBinding('attr.aria-describedBy') get useAriaDescribedBy() {
    return this.ariaDescribedBy ? this.ariaDescribedBy : '';
  }

  @HostBinding('attr.type') get getType() {
    return this.showPassword ? 'text' : 'password';
  }

  @HostBinding('class.amplify-input--error') hasError = false;
  /** The classes to attach to the element. */
  @HostBinding('class')
  get elementClasses() {
    return {
      'amplify-input': true,
      'amplify-field-group__control': true,
      'amplify-input--small': true,
    };
  }
  @HostBinding('id') id = this._id;
}
