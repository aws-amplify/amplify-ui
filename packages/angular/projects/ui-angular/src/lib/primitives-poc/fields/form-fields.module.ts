import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmplifyFormFieldsComponent } from './form-fields-component/form-fields.component';

@NgModule({
  declarations: [AmplifyFormFieldsComponent],
  imports: [CommonModule],
  exports: [AmplifyFormFieldsComponent],
})
export class AmplifyFormFieldsModule {}
