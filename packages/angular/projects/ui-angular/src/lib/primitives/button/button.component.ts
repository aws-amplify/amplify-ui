import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[amplify-button]',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() type: 'submit' | 'button' = 'button';
  @Input() fullWidth: boolean | string = false;
  @Input() isDisabled: boolean | string = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variation: 'primary' | 'default' | 'link' = 'default';
  @Input() fontWeight: 'normal' | 'bold' | 'lighter' = 'normal';

  @HostBinding('type') typeAttr: string;
  @HostBinding('attr.data-fullwidth') fullWidthAttr: boolean | string;
  @HostBinding('attr.data-size') sizeAttr: string;
  @HostBinding('attr.data-variation') variationAttr: string;
  @HostBinding('style.font-weight') fontWeightAttr: string;

  @HostBinding('attr.disabled') get getDisabled() {
    return this.isDisabled ? '' : null;
  }

  @HostBinding('class') get classNames() {
    let className = 'amplify-button';
    if (this.variation) {
      className += ` amplify-button--${this.variation}`;
    }
    if (this.size) {
      className += ` amplify-button--${this.size}`;
    }
    if (this.fullWidth) {
      className += ` amplify-button--fullwidth`;
    }
    if (this.isDisabled) {
      className += ` amplify-button--disabled amplify-button--loading`;
    }

    return className;
  }

  ngOnInit() {
    this.typeAttr = this.type;
    this.fullWidthAttr = this.fullWidth;
    this.sizeAttr = this.size;
    this.variationAttr = this.variation;
    this.fontWeightAttr = this.fontWeight;
  }
}
