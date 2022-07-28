import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { InputDirective } from '../text-field-directives/input.directive';

const $COMPONENT_SELECTOR: string = 'amplify-poc-text-field';
@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'text-field.component.html',
})
export class AmplifyTextFieldsComponent implements AfterContentInit {
  @Input() describedBy: string;
  @Input() labelHidden: boolean = false;
  @Input() hasError: boolean = false;

  @ContentChild(InputDirective) childInput: InputDirective | undefined;

  public inputId = '';

  constructor() {}

  ngAfterContentInit(): void {
    // getting data from child input
    this.inputId = this.childInput?.id;
    // send data to child input
    // note: this is still not dynamic, so we still need a change detction strategy here.
    // this can be implemented later for the purpose of POC.
    this.childInput.ariaDescribedBy = this.describedBy;
    this.childInput.hasError = this.hasError;
  }
}
