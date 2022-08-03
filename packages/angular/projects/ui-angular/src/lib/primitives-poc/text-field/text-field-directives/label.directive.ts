import { Directive, HostBinding } from '@angular/core';

const $Directive_Selector = '[amplify-label]';
@Directive({
  selector: $Directive_Selector,
})
export class LabelDirective {
  @HostBinding('class.amplify-label') className = true;
}
