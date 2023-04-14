import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { MyAmplifyUiLibModule } from 'my-amplify-ui-lib';

import { AppComponent } from './app.component';

// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyAmplifyUiLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
