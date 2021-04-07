import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-markdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicAuthenticatorComponent } from './pages/basic-authenticator/basic-authenticator.component';
import { UiAngularModule } from '@aws-amplify/ui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadlessAuthenticatorComponent } from './pages/headless-authenticator/headless-authenticator.component';
import { StyledAuthenticatorComponent } from './pages/styled-authenticator/styled-authenticator.component';
import { CustomComponentAuthenticatorComponent } from './pages/custom-component-authenticator/custom-component-authenticator.component';
import { CompositionAuthenticatorComponent } from './pages/composition-authenticator/composition-authenticator.component';
import { OnSubmitAuthenticatorComponent } from './pages/on-submit-authenticator/on-submit-authenticator.component';
import { CustomFormAuthenticatorComponent } from './pages/custom-form-authenticator/custom-form-authenticator.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicAuthenticatorComponent,
    HeadlessAuthenticatorComponent,
    StyledAuthenticatorComponent,
    CustomComponentAuthenticatorComponent,
    CompositionAuthenticatorComponent,
    OnSubmitAuthenticatorComponent,
    CustomFormAuthenticatorComponent
  ],
  imports: [
    UiAngularModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
