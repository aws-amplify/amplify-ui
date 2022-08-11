import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyPhoneNumberFieldComponent } from './phone-number-component/phone-number.component';
import { PhoneNumberDirective } from './phone-number-directive/phone-number.directive';

const Components = [AmplifyPhoneNumberFieldComponent, PhoneNumberDirective];
@NgModule({
  declarations: Components,
  imports: [CommonModule],
  exports: Components,
})
export class AmplifyPhoneNumberModule {}
