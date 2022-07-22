import { Component } from '@angular/core';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/base-primitive.component';

@Component({
  selector: 'amplify-fields',
  template: '<ng-content></ng-content>',
})
export class AmplifyFieldsComponent extends AmplifyBasePrimitiveComponent {
  ngOnInit() {
    // console.log('class name ', this.className);
    let attributesVal = [{ name: '', value: '' }];
    // attributesVal = this.element.nativeElement.attributes;
    // elementValue.innerHTML = this.element.nativeElement.innerHTML;
    // this.element.nativeElement.innerHTML = '';
    // for (let attr of attributesVal) {
    //   this.renderer.setStyle(elementValue, attr.name, attr.value);
    //   this.renderer.setProperty(elementValue, attr.name, attr.value);
    //   this.renderer.setAttribute(elementValue, attr.name, attr.value);
    // }
    //this.renderer.appendChild(this.element.nativeElement, elementValue);
  }
}
