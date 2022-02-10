import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
Amplify.configure({});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AmplifyAuthenticatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
