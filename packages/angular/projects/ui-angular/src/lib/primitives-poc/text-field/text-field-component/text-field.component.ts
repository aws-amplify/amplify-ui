import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { AmplifyDescriptionTextDirective } from '../../base-primitive';
import { InputDirective } from './input.directive';

const $COMPONENT_SELECTOR: string = 'amplify-poc-text-field';
@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'text-field.component.html',
})
export class AmplifyTextFieldsComponent {
  @Input() describedBy: string;

  @ContentChild(InputDirective)
  childInput: InputDirective;

  public inputId = '';

  constructor() {}

  ngAfterContentInit(): void {
    // getting data from child input
    this.inputId = this.childInput?.id;
    // send data to child input
    // note: this is still not dynamic, so we still need a change detction strategy here.
    // this can be implemented later for the purpose of POC.
    this.childInput.ariaDescribedBy = this.describedBy;
  }
}
