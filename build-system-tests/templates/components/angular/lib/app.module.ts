import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyAmplifyUiLibModule } from 'my-amplify-ui-lib';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyAmplifyUiLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
