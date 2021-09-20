import { Component, Input } from '@angular/core';
import {
  ActorContextWithForms,
  getActorContext,
  translate,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-form-select',
  templateUrl: './amplify-select.component.html',
})
export class AmplifySelectComponent {
  constructor() {}

  @Input() items: string[];
  @Input() name: string;
  @Input() label: string;
  @Input() id: string;

  public translate(phrase: string) {
    return translate<string>(phrase);
  }

  public inferId() {
    return this.id ?? this.name ?? 'amplify-select';
  }
}
