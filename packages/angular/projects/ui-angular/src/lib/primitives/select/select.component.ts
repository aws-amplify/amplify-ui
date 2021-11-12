import { Component, Input } from '@angular/core';

@Component({
  selector: 'amplify-form-select',
  templateUrl: './select.component.html',
})
export class AmplifySelectComponent {
  @Input() items: string[];
  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() defaultValue: string;
}
