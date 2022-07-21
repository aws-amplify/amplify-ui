import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyView } from './view';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
})
export class AmplifyViewComponent {
  @Input() as: string;
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

  @Output() click = new EventEmitter<any>();

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

  onClick($event) {
    if (this.isDisabled) $event.stopPropagation();

    this.click.emit($event);
  }

  constructor(private renderer: Renderer2, private element: ElementRef) {
    // super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (
        key === 'disabled' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
      }
    }
  }

  ngAfterContentInit() {
    let attributesVal = [{ name: '', value: '' }];
    attributesVal = this.element.nativeElement.attributes;

    let elementValue = this.renderer.createElement(this.as);
    elementValue.innerHTML = this.element.nativeElement.innerHTML;
    this.element.nativeElement.innerHTML = '';
    for (let attr of attributesVal) {
      if (attr.name == 'ariaLabel')
        this.renderer.setStyle(elementValue, 'aria-label', attr.value);
      else if (attr.name == 'backgroundColor')
        this.renderer.setStyle(elementValue, 'background-color', attr.value);
      else if (attr.name == 'borderRadius')
        this.renderer.setStyle(elementValue, 'border-radius', attr.value);
      else this.renderer.setStyle(elementValue, attr.name, attr.value);
    }
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
    this.renderer.setProperty(elementValue, 'class', result.data);

    this.renderer.appendChild(this.element.nativeElement, elementValue);
  }

  getRandomId() {
    return Math.floor(Math.random() * 6 + 1);
  }
}
