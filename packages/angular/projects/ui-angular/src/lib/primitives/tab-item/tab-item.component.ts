import { Component, Input } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'amplify-tab-item',
  templateUrl: './tab-item.component.html',
})
export class TabItemComponent {
  @Input() title: string;
  @Input() active = false;
  @Input() id: string;
  @Input() labelledById: string;
  @Input() tabIndex: number;
}
