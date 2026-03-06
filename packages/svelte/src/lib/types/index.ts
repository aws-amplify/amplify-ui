import {
  AuthenticatorServiceFacade,
  AuthInterpreter,
  AuthMachineSend,
  AuthMachineState,
  AuthStatus,
} from '@aws-amplify/ui';
import type { Snippet } from 'svelte';
import type { Writable } from 'svelte/store';

export interface UseAuthenticator extends AuthenticatorServiceFacade {
  QRFields: { totpIssuer?: string; totpUsername?: string } | null;
}

export interface UseAuth {
  state: Writable<AuthMachineState>;
  send: AuthMachineSend;
  service: AuthInterpreter;
  authStatus: AuthStatus;
}

export interface Components {
  Footer?: Snippet;
  FormFields?: Snippet;
  Header?: Snippet;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any;
