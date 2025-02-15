import { Component, Input } from '@angular/core';
import { nanoid } from 'nanoid';

import { classNames, ComponentClassName } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-radio-group-field',
  templateUrl: './radio-group-field.component.html',
})
export class RadioGroupFieldComponent {
  @Input() disabled = false;
  @Input() label = '';
  @Input() name: string;
  @Input() required = true;
  @Input() labelHidden = false;
  @Input() hasError: boolean;
  @Input() describedBy: string;
  @Input() radioOptions: { label: string; value: string }[];

  public type = 'radio';
  public radioFieldId = `amplify-field-${nanoid(12)}`;

  public classNames = classNames;
  public ComponentClassName = ComponentClassName;
}
