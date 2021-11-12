import { Component } from '@angular/core';

@Component({
  selector: 'amplify-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  public isVisible = true;

  public close() {
    this.isVisible = false;
  }
}
