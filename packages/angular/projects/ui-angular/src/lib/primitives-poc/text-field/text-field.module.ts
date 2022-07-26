import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyFormFieldsModule } from '../fields';
import { AmplifyTextFieldsComponent } from './text-field-component/text-field.component';

@NgModule({
  declarations: [AmplifyTextFieldsComponent],
  imports: [CommonModule, AmplifyFormFieldsModule],
  exports: [AmplifyTextFieldsComponent],
})
export class AmplifyTextFieldModule {}
