import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContextPropsDirective } from './directives/context-props.directive';
import { SparkContextProviderComponent } from './spark-context-provider/spark-context-provider.component';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AuthComponentTypeDirective } from './directives/auth-component-type.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContextPropsDirective,
    SparkContextProviderComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AuthComponentTypeDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
