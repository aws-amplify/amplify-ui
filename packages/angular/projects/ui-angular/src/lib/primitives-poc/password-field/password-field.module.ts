import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyTextFieldModule } from '../text-field';

import { AmplifyPasswordFieldComponent } from './password-field-component/password-field.component';
import { PasswordDirective } from './password-field-directive/password-field.directive';

const components = [AmplifyPasswordFieldComponent, PasswordDirective];
@NgModule({
  declarations: [components],
  imports: [CommonModule, AmplifyTextFieldModule],
  exports: [components],
})
export class AmplifyPasswordFieldModule {}
