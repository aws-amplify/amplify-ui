import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { nanoid } from 'nanoid';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/components/base-primitive.component';

const $COMPONENT_SELECTOR: string = 'amplify-form-fields';

@Component({
  selector: $COMPONENT_SELECTOR,
  template: '<ng-content [select]="selector"></ng-content>',
})
export class AmplifyFormFieldsComponent extends AmplifyBasePrimitiveComponent {
  @Input() selector: string;

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
