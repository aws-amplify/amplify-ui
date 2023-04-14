import { NgModule } from '@angular/core';
import { MyAmplifyUiLibComponent } from '../../../../mega-apps/ng-15-lib-15-ts/projects/my-amplify-ui-lib/src/lib/my-amplify-ui-lib.component';
// @ts-ignore
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

// @ts-ignore
@NgModule({
  declarations: [MyAmplifyUiLibComponent],
  imports: [AmplifyAuthenticatorModule],
  exports: [MyAmplifyUiLibComponent],
})
export class MyAmplifyUiLibModule {}
