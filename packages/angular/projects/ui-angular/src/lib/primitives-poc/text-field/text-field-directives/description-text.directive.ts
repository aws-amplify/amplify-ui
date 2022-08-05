import { Directive, HostBinding } from '@angular/core';

const $Directive_Selector = '[amplify-description-text]';
@Directive({
  selector: $Directive_Selector,
})
export class DescriptionDirective {
  @HostBinding('class.amplify-text') className = true;
  @HostBinding('class.amplify-field__description') descClassName = true;
}
