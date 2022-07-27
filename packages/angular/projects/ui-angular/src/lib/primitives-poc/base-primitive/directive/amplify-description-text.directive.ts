import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[amplify-description-text]',
})
export class AmplifyDescriptionTextDirective {
  @HostBinding('class.amplify-field__description') className = true;
}
