import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmplifyButtonComponent } from './button-component/button.component';

let Components: any[] = [AmplifyButtonComponent];
@NgModule({
  declarations: Components,
  imports: [CommonModule],
  exports: Components,
})
export class AmplifyButtonModule {}
