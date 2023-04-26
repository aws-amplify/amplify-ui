import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amplify-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() defaultChecked = false;
  @Input() errorMessage: string;
  @Input() hasError = false;
  @Input() label: string;
  @Input() name: string;
  @Input() value: string;

  public isChecked = false;

  ngOnInit() {
    if (this.defaultChecked) {
      this.isChecked = true;
    }
  }

  handleClick() {
    this.isChecked = !this.isChecked;
  }
}
