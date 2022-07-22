import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyPrimitiveBaseComponent } from '../../primitive-base/primitive-base.component';

@Component({
  selector: 'button[amplify-button-poc]',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmplifyButtonComponent
  extends AmplifyPrimitiveBaseComponent
  implements OnInit
{
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

  @HostBinding('class') get classNames() {
    let className = 'amplify-button';
    const result = {
      ...(this.variation && {
        data: (className += ` amplify-button--${this.variation}`),
      }),
      ...(this.size && {
        data: (className += ` amplify-button--${this.size}`),
      }),
      ...(this.fullWidth && {
        data: (className += ` amplify-button--fullwidth`),
      }),
      ...(this.isDisabled && {
        data: (className += ` amplify-button--disabled amplify-button--loading`),
      }),
    };
    return result.data;
  }

  // constructor(private shared: AmplifyPrimitiveSharedService) {}

  ngOnInit() {
    this.typeAttr = this.type;
    this.fullWidthAttr = this.fullWidth;
    this.sizeAttr = this.size;
    this.variationAttr = this.variation;
    this.fontWeightAttr = this.fontWeight;
  }
}
