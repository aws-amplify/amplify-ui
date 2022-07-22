import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmplifyViewComponent } from './view-component/view.component';

@NgModule({
  declarations: [AmplifyViewComponent],
  imports: [CommonModule],
  exports: [AmplifyViewComponent],
})
export class AmplifyViewModule {}
