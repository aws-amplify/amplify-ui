import { NgModule } from '@angular/core';
import { MyAmplifyUiLibComponent } from './my-amplify-ui-lib.component';
// @ts-ignore
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

// @ts-ignore
@NgModule({
  declarations: [MyAmplifyUiLibComponent],
  imports: [AmplifyAuthenticatorModule],
  exports: [MyAmplifyUiLibComponent],
})
export class MyAmplifyUiLibModule {}
