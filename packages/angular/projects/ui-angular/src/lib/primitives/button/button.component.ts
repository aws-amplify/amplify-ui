import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[amplify-button]',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() type: 'submit' | 'button' = 'button';
  @Input() fullWidth: boolean | string = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variation: 'primary' | 'default' | 'link' = 'default';
  @Input() fontWeight: 'normal' | 'bold' | 'lighter' = 'normal';

  @HostBinding('type') typeAttr: string;
  @HostBinding('attr.data-fullwidth') fullWidthAttr: boolean | string;
  @HostBinding('attr.data-size') sizeAttr: string;
  @HostBinding('attr.data-variation') variationAttr: string;
  @HostBinding('class.amplify-button') defaultClass = true;
  @HostBinding('style.font-weight') fontWeightAttr: string;

  ngOnInit() {
    this.typeAttr = this.type;
    this.fullWidthAttr = this.fullWidth;
    this.sizeAttr = this.size;
    this.variationAttr = this.variation;
    this.fontWeightAttr = this.fontWeight;
  }
}
