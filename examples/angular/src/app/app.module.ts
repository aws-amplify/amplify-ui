import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [AppComponent, SignInWithEmailComponent],
  imports: [BrowserModule, AppRoutingModule, UiAngularModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
