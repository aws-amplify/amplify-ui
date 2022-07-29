import { Component, Input } from '@angular/core';

const $COMPONENT_SELECTOR: string = 'amplify-password-poc';

@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'password-field.component.html',
})
export class AmplifyPasswordFieldComponent {
  @Input() labelHidden: boolean = false;
  @Input() hasError: boolean = false;
}
