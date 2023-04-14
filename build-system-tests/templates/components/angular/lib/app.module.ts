import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { MyAmplifyUiLibModule } from 'my-amplify-ui-lib';

import { AppComponent } from '../../../../mega-apps/ng-15-lib-15-ts/src/app/app.component';

// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyAmplifyUiLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
