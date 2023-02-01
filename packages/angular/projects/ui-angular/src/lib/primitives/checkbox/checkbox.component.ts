import { Component, Input, OnInit } from '@angular/core';
import { Logger } from 'aws-amplify';

import { warnMissingProp } from '../../common';

const logger = new Logger('amplify-checkbox');

@Component({
  selector: 'amplify-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() defaultChecked: boolean = false;
  @Input() errorMessage?: string;
  @Input() hasError: boolean = false;
  @Input() label!: string;
  @Input() name!: string;
  @Input() value!: string;

  public isChecked: boolean = false;

  ngOnInit() {
    warnMissingProp('amplify-checkbox', 'label', this.label);
    warnMissingProp('amplify-checkbox', 'name', this.name);
    warnMissingProp('amplify-checkbox', 'value', this.value);

    if (this.defaultChecked) {
      this.isChecked = true;
    }
  }

  handleClick() {
    this.isChecked = !this.isChecked;
  }
}
