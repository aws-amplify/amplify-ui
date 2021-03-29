import { Injectable } from '@angular/core';
import { AuthState, CustomComponents } from '../common';

/**
 * AmplifyContextService contains access to the xstate machine
 * and custom components passed by the user.
 */
@Injectable({
  providedIn: 'root', // ensure we have a singleton service
})
export class StateMachineService {
  private _authState: AuthState;

  public set authState(authState: AuthState) {
    this._authState = authState;
  }

  public get authState(): AuthState {
    return this._authState;
  }

  constructor() {
    console.log('amplify context service initialized', this);
  }
}
