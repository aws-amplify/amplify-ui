import { Directive, HostBinding, Input } from '@angular/core';
import { nanoid } from 'nanoid';

const $Directive_Selector = '[amplify-input]';
@Directive({
  selector: $Directive_Selector,
})
export class InputDirective {
  private _id = nanoid(8);
  private _ariaDescribedBy: string = 'test';

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
  @HostBinding('class.amplify-input--error') hasError = false;
  /** The classes to attach to the element. */
  @HostBinding('class')
  get elementClasses() {
    return {
      'amplify-input': true,
      'amplify-field-group__control': true,
      'amplify-input--quiet': true,
    };
  }
  @HostBinding('id') id = this._id;
}
