import { Component, Input, OnInit } from '@angular/core';
import { Logger } from 'aws-amplify';

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
    if (!this.label) {
      logger.error('<amplify-checkbox> requires `label` to be defined.');
    }
    if (!this.name) {
      logger.error('<amplify-checkbox> requires `name` to be defined.');
    }
    if (!this.value) {
      logger.error('<amplify-checkbox> requires `value` to be defined.');
    }

    if (this.defaultChecked) {
      this.isChecked = true;
    }
  }

  handleClick() {
    this.isChecked = !this.isChecked;
  }
}
