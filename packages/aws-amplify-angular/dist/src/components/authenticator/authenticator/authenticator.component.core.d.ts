import { OnInit } from '@angular/core';
import { AmplifyService, AuthState } from '../../../providers';
export declare class AuthenticatorComponentCore implements OnInit {
  amplifyService: AmplifyService;
  authState: AuthState;
  _signUpConfig: any;
  _usernameAttributes: string;
  constructor(amplifyService: AmplifyService);
  ngOnInit(): void;
  hide: string[];
  set data(data: any);
  set signUpConfig(signUpConfig: any);
  set usernameAttributes(usernameAttributes: string);
  subscribe(): void;
  shouldHide(comp: any): boolean;
}
