import { Component, Input } from '@angular/core';

const $COMPONENT_SELECTOR: string = 'amplify-poc-flex';

@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'flex.component.html',
})
export class AmplifyFlexComponent {
  @Input() wrap: string;
  @Input() direction: string;
  @Input() alignContent: string;
  @Input() justifyContent: string;
  @Input() alignItems: string;
  @Input() gap: string;
}
