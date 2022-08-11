import { Directive, HostBinding, Input } from '@angular/core';
import { nanoid } from 'nanoid';

const $Directive_Selector = '[amplify-phone-number-input]';
@Directive({
  selector: $Directive_Selector,
})
export class PhoneNumberDirective {
  private _id = nanoid(8);
  private _ariaDescribedBy: string = 'test';
  private _hasError: boolean = false;

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

  @HostBinding('attr.aria-describedBy') get useAriaDescribedBy() {
    return this.ariaDescribedBy ? this.ariaDescribedBy : '';
  }

  public set hasError(hasError: boolean) {
    this._hasError = hasError;
  }
  public get hasError() {
    return this._hasError;
  }
  @HostBinding('class.amplify-input--error') get gethasError() {
    return this.hasError;
  }
  /** The classes to attach to the element. */
  @HostBinding('class')
  get elementClasses() {
    return {
      'amplify-input': true,
      'amplify-field-group__control': true,
    };
  }
  @HostBinding('id') id = this._id;
}
