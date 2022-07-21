import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'amplify-view',
  template: '',
})
export class AmplifyView implements OnChanges {
  @Input() id?: number;

  @Input() className?: string;

  @Input() testId?: string;

  @Input() as?: string;

  @Input() style?: boolean;

  @Input() backgroundColor?: string;

  @Input() backgroundImage?: string;

  @Input() border?: string;

  @Input() borderRadius?: string;

  @Input() bottom?: string;

  @Input() boxShadow?: string;

  @Input() color?: string;

  @Input() display?: string;

  @Input() fontFamily?: string;

  @Input() fontSize?: string;

  @Input() fontStyle?: string;

  @Input() fontWeight?: string;

  @Input() height?: string;

  @Input() left?: string;

  @Input() letterSpacing?: string;

  @Input() lineHeight?: string;

  @Input() margin?: string;

  @Input() marginBlock?: string;

  @Input() marginBlockEnd?: string;

  @Input() marginBlockStart?: string;

  @Input() marginBottom?: string;

  @Input() marginInline?: string;

  @Input() marginInlineEnd?: string;

  @Input() marginInlineStart?: string;

  @Input() marginLeft?: string;

  @Input() marginRight?: string;

  @Input() marginTop?: string;

  @Input() maxHeight?: string;

  // @Output() click = new EventEmitter<any>();
  // onClick($event) {
  //   // this.click.next($event);
  //   //this.emitEvent('click', $event, null, null);
  // }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (
        key === 'disabled' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
        //changes related to disabled
      }
      if (
        key === 'readOnly' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
        // changes related to readonly
      }
    }
  }
}
