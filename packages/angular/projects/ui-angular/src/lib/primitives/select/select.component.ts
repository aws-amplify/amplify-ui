import { Component, Input } from '@angular/core';

@Component({
  selector: 'amplify-form-select',
  standalone: false,
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() items: string[];
  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() defaultValue: string;
}
