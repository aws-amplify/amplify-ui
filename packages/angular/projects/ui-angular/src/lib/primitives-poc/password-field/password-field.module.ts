import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyTextFieldModule } from '../text-field';

import { AmplifyPasswordFieldComponent } from './password-field.component/password-field.component';

@NgModule({
  declarations: [AmplifyPasswordFieldComponent],
  imports: [CommonModule, AmplifyTextFieldModule],
  exports: [AmplifyPasswordFieldComponent],
})
export class AmplifyPasswordFieldModule {}
