import { Directive, HostBinding, Input } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[amplify-input]',
})
export class AmplifyInputDirective {
  @Input() inputcheck = '';

  constructor() {
    console.log('thsi.inputcheck ', this.inputcheck);
  }
  private _id = nanoid(8);
  private _ariaDescribedBy: string;

  public get ariaDescribedBy(): string {
    return this._ariaDescribedBy;
  }
  public set ariaDescribedBy(ariaDescribedBy: string) {
    this._ariaDescribedBy = ariaDescribedBy;
  }
  @HostBinding('attr.aria-describedBy') get useAriaDescribedBy() {
    return this.ariaDescribedBy;
  }

  @HostBinding('class.amplify-input') className = true;
  @HostBinding('id') id = this._id;
}
