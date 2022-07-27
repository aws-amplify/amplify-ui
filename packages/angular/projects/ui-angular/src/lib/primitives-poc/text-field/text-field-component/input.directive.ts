import { Directive, HostBinding, Input } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[amplify-input]',
})
export class InputDirective {
  constructor() {}
  private _id = nanoid(8);
  private _ariaDescribedBy: string = 'test';

  public get ariaDescribedBy(): string {
    return this._ariaDescribedBy;
  }
  public set ariaDescribedBy(ariaDescribedBy: string) {
    this._ariaDescribedBy = ariaDescribedBy;
  }
  @HostBinding('attr.aria-describedBy') get useAriaDescribedBy() {
    return this.ariaDescribedBy ? this.ariaDescribedBy : '';
  }

  @HostBinding('class.amplify-input') className = true;
  @HostBinding('id') id = this._id;
}
