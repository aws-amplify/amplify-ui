import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

type AuthState = 'signIn' | 'signedIn';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  styleUrls: ['./amplify-authenticator.component.css'],
})
export class AmplifyAuthenticatorComponent implements OnChanges {
  constructor(private cd: ChangeDetectorRef) {}

  @ContentChild(TemplateRef) template;
  @ContentChildren(AmplifyAuthenticatorComponent) customComponents;
  @ContentChild('signIn') signInContent: TemplateRef<any>;
  @ContentChild('signedIn') signedInContent: TemplateRef<any>;
  authState: AuthState = 'signIn';
  get getAuthState(): AuthState {
    return this.authState;
  }
  @Output()
  context = {
    $implicit: {
      updateAuthState: (authState: AuthState) =>
        this.updateAuthState(authState),
    },
    authState: this.authState,
  };
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  updateAuthState($event): void {
    this.authState = $event;
    this.cd.detectChanges();
  }
}
