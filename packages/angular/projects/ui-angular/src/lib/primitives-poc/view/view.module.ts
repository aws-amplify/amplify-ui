import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyPrimitiveModule } from '../primitive/primitive.module';
import { AmplifyView } from './view-component/view';

import { AmplifyViewComponent } from './view-component/view.component';

@NgModule({
  declarations: [AmplifyViewComponent, AmplifyView],
  imports: [CommonModule, AmplifyPrimitiveModule],
  exports: [AmplifyViewComponent],
})
export class AmplifyViewModule {}
