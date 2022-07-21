import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyView } from './view-component/view';

import { AmplifyViewComponent } from './view-component/view.component';

@NgModule({
  declarations: [AmplifyViewComponent, AmplifyView],
  imports: [CommonModule],
  exports: [AmplifyViewComponent],
})
export class AmplifyViewModule {}
