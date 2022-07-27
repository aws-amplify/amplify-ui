import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyDescriptionTextDirective } from './directive/amplify-description-text.directive';
import { AmplifyInputDirective } from './directive/amplify-input.directive';

@NgModule({
  declarations: [AmplifyDescriptionTextDirective, AmplifyInputDirective],
  imports: [CommonModule],
  exports: [AmplifyDescriptionTextDirective, AmplifyInputDirective],
})
export class AmplifyBaseComponentModule {}
