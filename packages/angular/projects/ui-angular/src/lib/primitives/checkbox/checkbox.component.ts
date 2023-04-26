import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amplify-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() defaultChecked: boolean = false;
  @Input() errorMessage: string;
  @Input() hasError: boolean = false;
  @Input() label: string;
  @Input() name: string;
  @Input() value: string;

  public isChecked: boolean = false;

  ngOnInit() {
    if (this.defaultChecked) {
      this.isChecked = true;
    }
  }

  handleClick() {
    this.isChecked = !this.isChecked;
  }
}
