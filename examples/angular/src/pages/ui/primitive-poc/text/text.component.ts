import { Component, Input } from '@angular/core';

@Component({
  selector: 'amplify-view-demo',
  templateUrl: 'text.component.html',
})
export class AmplifyTextExampleComponent {
  @Input() buttonName = 'Amplify text POC ';
  @Input() flag = true;
}
