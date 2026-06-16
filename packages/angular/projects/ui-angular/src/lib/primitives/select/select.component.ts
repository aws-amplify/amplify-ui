import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'amplify-form-select',
  standalone: false,
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectComponent {
  @Input() items: string[];
  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() defaultValue: string;
}
