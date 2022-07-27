import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyBaseComponentModule } from '../base-primitive';
import { InputDirective } from './text-field-component/input.directive';
import { AmplifyTextFieldsComponent } from './text-field-component/text-field.component';

@NgModule({
  declarations: [AmplifyTextFieldsComponent, InputDirective],
  imports: [CommonModule, AmplifyBaseComponentModule],
  exports: [AmplifyTextFieldsComponent, InputDirective],
})
export class AmplifyTextFieldModule {}
