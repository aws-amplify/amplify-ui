import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyTextComponent } from './text-component/text.component';

@NgModule({
  declarations: [AmplifyTextComponent],
  imports: [CommonModule],
  exports: [AmplifyTextComponent],
})
export class AmplifyTextModule {}
