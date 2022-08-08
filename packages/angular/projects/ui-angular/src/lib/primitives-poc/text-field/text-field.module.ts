import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DescriptionDirective } from './text-field-directives/description-text.directive';
import { ErrorDirective } from './text-field-directives/error.directive';
import { InputDirective } from './text-field-directives/input.directive';
import { LabelDirective } from './text-field-directives/label.directive';
import { AmplifyTextFieldsComponent } from './text-field-component/text-field.component';

let Components: any[] = [
  AmplifyTextFieldsComponent,
  InputDirective,
  DescriptionDirective,
  ErrorDirective,
  LabelDirective,
];
@NgModule({
  declarations: Components,
  imports: [CommonModule],
  exports: Components,
})
export class AmplifyTextFieldModule {}
