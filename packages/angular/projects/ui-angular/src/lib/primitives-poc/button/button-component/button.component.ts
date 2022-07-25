import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/base-primitive.component';

@Component({
  selector: 'button[amplify-button-poc]',
  template: '<ng-content></ng-content>',
})
export class AmplifyButtonComponent
  extends AmplifyBasePrimitiveComponent
  implements OnInit
{
  @Input() type: 'submit' | 'button' = 'button';
  @Input() fullWidth: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variation: 'primary' | 'default' | 'link' = 'default';
  @Input() fontWeight: 'normal' | 'bold' | 'lighter' = 'normal';

  @HostBinding('type') typeAttr: string;
  @HostBinding('attr.data-fullwidth') fullWidthAttr: boolean | string;
  @HostBinding('attr.data-size') sizeAttr: string;
  @HostBinding('attr.data-variation') variationAttr: string;
  @HostBinding('style.font-weight') fontWeightAttr: string;

  @HostBinding('class') get classNamesProp() {
    const classNames = require('classnames');
    return classNames(
      { [`amplify-button amplify-button--${this.variation}`]: this.variation },
      { [`amplify-button amplify-button--${this.size}`]: this.size },
      { [`amplify-button amplify-button--fullwidth`]: this.fullWidth },
      {
        [`amplify-button amplify-button--disabled amplify-button--loading`]:
          this.isDisabled,
      }
    );
  }

  ngOnInit() {
    this.typeAttr = this.type;
    this.fullWidthAttr = this.fullWidth;
    this.sizeAttr = this.size;
    this.variationAttr = this.variation;
    this.fontWeightAttr = this.fontWeight;
  }
}
