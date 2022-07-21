import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyPrimitiveComponent } from './primitivie-component/primitive.component';

@NgModule({
  declarations: [AmplifyPrimitiveComponent],
  imports: [CommonModule],
  exports: [AmplifyPrimitiveComponent],
})
export class AmplifyPrimitiveModule {}
