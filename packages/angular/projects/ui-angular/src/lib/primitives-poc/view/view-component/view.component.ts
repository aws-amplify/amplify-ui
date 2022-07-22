import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

/** Config file to get all the configuration related the strings and values */
import { ComponentSettings } from './ComponentSetting';
@Component({
  selector: ComponentSettings.COMPONENTNAME,
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmplifyViewComponent implements OnInit, OnChanges {
  /** Input Prop for style changes  */
  @Input() type: 'submit' | 'button' = 'button';
  @Input() fullWidth: boolean | string = false;
  @Input() isDisabled: boolean | string = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variation: 'primary' | 'default' | 'link' = 'default';

  @HostBinding('type') typeAttr: string;
  @HostBinding('attr.data-fullwidth') fullWidthAttr: boolean | string;
  @HostBinding('attr.data-size') sizeAttr: string;
  @HostBinding('attr.data-variation') variationAttr: string;
  @HostBinding('style.font-weight') fontWeightAttr: string;

  @HostBinding('attr.disabled') get getDisabled() {
    return this.isDisabled ? '' : null;
  }

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  /** onchange method to detecte prop changes and update the accordingly */
  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes[key].currentValue !== changes[key].previousValue) {
        /** Set the attribute value if changed */
        this.renderer.setProperty(
          this.element.nativeElement,
          key,
          changes[key].currentValue
        );
      }
    }
  }

  ngOnInit() {
    for (let attr of this.element.nativeElement.attributes) {
      let propName = attr.name;

      /** update the different name prop value and update accordingly */
      if (Object.keys(ComponentSettings.PROPMAP).indexOf(attr.name) !== -1) {
        propName = ComponentSettings.PROPMAP[attr.name];
      }
      this.renderer.setStyle(this.element.nativeElement, propName, attr.value);
    }

    /** Add Css Class related to the button */
    if (this.element.nativeElement.tagName == 'BUTTON') {
      this.renderer.addClass(
        this.element.nativeElement,
        this.getButtonCSSClass()
      );
    }
  }

  /** Get the Css Class according to the input prop */
  getButtonCSSClass() {
    let className = ComponentSettings.BUTTON_CLASS_NAME;
    const result = {
      ...(this.variation && {
        data: (className += ` ${ComponentSettings.BUTTON_CLASS_NAME}--${this.variation}`),
      }),
      ...(this.size && {
        data: (className += ` ${ComponentSettings.BUTTON_CLASS_NAME}--${this.size}`),
      }),
      ...(this.fullWidth && {
        data: (className += ` ${ComponentSettings.BUTTON_FULLWIDTH_CLASS_NAME}`),
      }),
      ...(this.isDisabled && {
        data: (className += ` ${ComponentSettings.BUTTON_DISABLE_CLASS_NAME}`),
      }),
    };
    return result.data;
  }
}
