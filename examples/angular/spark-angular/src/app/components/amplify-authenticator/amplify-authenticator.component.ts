import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
} from '@angular/core';
import { AuthComponentTypeDirective } from 'src/app/directives/auth-component-type.directive';
import { ContextPropsDirective } from 'src/app/directives/context-props.directive';

type AuthState = 'signIn' | 'signedIn';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  styleUrls: ['./amplify-authenticator.component.css'],
})
export class AmplifyAuthenticatorComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log(this.customComponents);
  }
  user: Record<PropertyKey, any>;
  authState: AuthState = 'signIn';
  @ContentChild(ContextPropsDirective) contextProp: ContextPropsDirective;
  @ContentChildren(AuthComponentTypeDirective) customComponents;

  context = {
    $implicit: {
      updateAuthState: (authState: AuthState) =>
        this.updateAuthState(authState),
    },
  };

  updateAuthState($event) {
    console.log($event);
    this.authState = $event;
  }
}
