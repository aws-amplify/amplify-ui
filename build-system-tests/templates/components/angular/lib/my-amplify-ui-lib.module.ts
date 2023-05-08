import { NgModule } from '@angular/core';
import { MyAmplifyUiLibComponent } from './my-amplify-ui-lib.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [MyAmplifyUiLibComponent],
  imports: [AmplifyAuthenticatorModule],
  exports: [MyAmplifyUiLibComponent],
})
export class MyAmplifyUiLibModule {}
