import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmplifyFieldsComponent } from './fields-component/fields.component';

@NgModule({
  declarations: [AmplifyFieldsComponent],
  imports: [CommonModule],
  exports: [AmplifyFieldsComponent],
})
export class AmplifyFieldsModule {}
