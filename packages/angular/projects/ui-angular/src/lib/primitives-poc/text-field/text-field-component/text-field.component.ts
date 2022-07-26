import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/components/base-primitive.component';
import constants from '../../shared/constants.json';

const $COMPONENT_SELECTOR: string = 'amplify-poc-text-field';
@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'text-field.component.html',
})
export class AmplifyTextFieldsComponent extends AmplifyBasePrimitiveComponent {
  @Input() autocomplete = 'new-password';
  _autocomplete() {
    return this.autocomplete;
  }

  @Input() isDisabled = false;
  _disabled() {
    return true;
  }

  @Input() fieldId: string = `amplify-field-${nanoid(12)}`;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() type: string;
  @Input() labelHidden = false;
  @Input() hasError: boolean;
  _hasError() {
    return this.hasError;
  }
  @Input() describedBy: string;

  constructor(private renderer: Renderer2, private element: ElementRef) {
    super();
  }

  ngOnInit() {
    for (let i = 0; i < this.element.nativeElement.childNodes.length; i++) {
      let attributes = this.element.nativeElement.childNodes[i].attributes;
      let amplifySelector = Object.values(attributes).filter((value) =>
        value['name'].includes('amplify')
      );
      if (amplifySelector.length > 0)
        this.ApplyStyle(
          amplifySelector[0]['name'],
          this.element.nativeElement.childNodes[i]
        );
    }
  }

  ApplyStyle(selectorName, elementValue) {
    if (selectorName == 'amplify-label') {
      this.renderer.setAttribute(elementValue, 'for', this.fieldId);
      this.renderer.addClass(elementValue, 'amplify-label');
    } else if (selectorName == 'amplify-input') {
      this.renderer.setAttribute(elementValue, 'id', this.fieldId);
      this.renderer.addClass(elementValue, 'amplify-input');
    }
    if (selectorName == 'amplify-descriptive-text') {
      this.renderer.addClass(elementValue, 'amplify-field__description');
      this.renderer.addClass(elementValue, 'amplify-text');
    }
    if (selectorName == 'amplify-error') {
      this.renderer.addClass(elementValue, 'amplify-alert--error');
      this.renderer.addClass(elementValue, 'amplify-alert');
      this.renderer.addClass(elementValue, 'amplify-flex');

      this.renderer.setStyle(elementValue, 'align-items', 'center');
      this.renderer.setStyle(elementValue, 'justify-content', 'space-between');
    }
  }
}
