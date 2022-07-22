import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmplifyPrimitiveBaseComponent {
  @Input() id?: string;

  @Input() className?: string;

  @Input() testId?: string;
}
