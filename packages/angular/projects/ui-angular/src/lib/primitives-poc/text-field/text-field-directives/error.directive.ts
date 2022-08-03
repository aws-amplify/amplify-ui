import { Directive, HostBinding } from '@angular/core';

const $Directive_Selector = '[amplify-error]';
@Directive({
  selector: $Directive_Selector,
})
export class ErrorDirective {
  @HostBinding('class.amplify-text') className = true;
  @HostBinding('class.amplify-field__error-message') errorClassName = true;
}
