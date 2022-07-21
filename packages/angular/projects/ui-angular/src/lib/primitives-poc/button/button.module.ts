import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmplifyButtonComponent } from './button-component/button.component';

@NgModule({
  declarations: [AmplifyButtonComponent],
  imports: [CommonModule],
  exports: [AmplifyButtonComponent],
})
export class AmplifyButtonModule {}
