import { Component, ElementRef, Renderer2 } from '@angular/core';
import { nanoid } from 'nanoid';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/base-primitive.component';

const $COMPONENT_SELECTOR: string = 'amplify-form-fields';

@Component({
  selector: $COMPONENT_SELECTOR,
  template: '<ng-content></ng-content>',
})
export class AmplifyFormFieldsComponent extends AmplifyBasePrimitiveComponent {
  constructor(private renderer: Renderer2, private element: ElementRef) {
    super();
  }

  ngOnInit() {
    const randomId = this.getRandomId();
    let val = 'amplify-' + randomId;
    for (let ele in this.element.nativeElement.children) {
      this.renderer.setProperty(ele, 'id', val);
    }
  }

  getRandomId() {
    return nanoid(12);
  }
}
