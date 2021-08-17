import { OnInit, EventEmitter } from '@angular/core';
import { UsernameFieldOutput, PhoneFieldOutput } from '../types';
import { AmplifyService } from '../../../providers/amplify.service';
export declare class UsernameFieldComponentCore implements OnInit {
  amplifyService: AmplifyService;
  _usernameAttributes: string;
  _placeholder: string;
  username: string;
  constructor(amplifyService: AmplifyService);
  set data(data: any);
  set usernameAttributes(usernameAttributes: string);
  set placeholder(placeholder: string);
  usernameFieldChanged: EventEmitter<UsernameFieldOutput>;
  ngOnInit(): void;
  ngOnDestroy(): void;
  setUsername(username: string): void;
  setEmail(email: string): void;
  getUsernameLabel(): any;
  getPlaceholder(): any;
  onPhoneFieldChanged(event: PhoneFieldOutput): void;
}
