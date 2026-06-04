import { Component, ChangeDetectionStrategy } from '@angular/core';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-error',
  standalone: false,
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ErrorComponent {
  public isVisible = true;
  public dismissAriaLabel = translate('Dismiss alert');

  public close(): void {
    this.isVisible = false;
  }
}
