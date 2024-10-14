import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppComponent } from './app.component';
import { Amplify } from 'aws-amplify';
import aws_exports from '../../../../environments/auth-with-email/src/aws-exports.js';
Amplify.configure(aws_exports);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AmplifyAuthenticatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
