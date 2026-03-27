import {
  type AuthMachineState,
  type AuthStatus,
  createAuthenticatorMachine,
  defaultAuthHubHandler,
  getActorContext,
  getServiceFacade,
  listenToAuthHub,
} from '@aws-amplify/ui';
import type { AmplifyContext } from 'aws-amplify';
import { getContext, onDestroy, setContext } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';
import { interpret } from 'xstate';
import { getCurrentUser } from 'aws-amplify/auth';
import { type AnyFn, type UseAuthenticator } from '../types';

type SharedReturn<T extends AnyFn = AnyFn> = T;
type StateMachine = ReturnType<typeof createAuthenticatorMachine>;

const AMPLIFY_CONTEXT_KEY = Symbol('AmplifyContext');

/** Set AmplifyContext in Svelte component context */
export function setAmplifyContext(ctx: AmplifyContext): void {
  setContext(AMPLIFY_CONTEXT_KEY, ctx);
}

/** Get AmplifyContext from Svelte component context */
export function getAmplifyContext(): AmplifyContext | undefined {
  try {
    return getContext<AmplifyContext>(AMPLIFY_CONTEXT_KEY);
  } catch {
    return undefined;
  }
}

const shared = <Fn extends AnyFn>(fn: Fn): SharedReturn<Fn> => {
  let result: ReturnType<Fn>;
  let ran = false;
  return <Fn>((...args: Parameters<Fn>) => {
    if (!ran) {
      ran = true;
      result = fn(...args);
    }
    return result;
  });
};

const useServiceRef = (logic: StateMachine) => {
  const service = interpret(logic).start();
  return service;
};

const useService = (logic: StateMachine) => {
  const serviceRef = useServiceRef(logic);
  const serviceState: Writable<AuthMachineState> = writable(
    serviceRef.getSnapshot() as unknown as AuthMachineState
  );
  const subscription = serviceRef.subscribe((newState) => {
    serviceState.set(newState as unknown as AuthMachineState);
  });
  onDestroy(() => subscription.unsubscribe());
  return {
    state: serviceState,
    send: serviceRef.send,
    service: serviceRef,
  };
};

export const useAuth = shared(() => {
  const amplifyContext = getAmplifyContext();
  const machine = createAuthenticatorMachine({ amplifyContext });
  const { send, service, state } = useService(machine);
  const authStatus: Writable<AuthStatus> = writable('configuring');

  const check = amplifyContext
    ? () => getCurrentUser(amplifyContext)
    : () => getCurrentUser(undefined as any);

  check()
    .then(() => {
      authStatus.set('authenticated');
    })
    .catch(() => {
      authStatus.set('unauthenticated');
    });
  onDestroy(
    listenToAuthHub(service, (data, service) =>
      defaultAuthHubHandler(data, service, {
        onSignIn: () => {
          authStatus.set('authenticated');
        },
        onSignOut: () => {
          authStatus.set('unauthenticated');
        },
      })
    )
  );

  return {
    state,
    send,
    service,
    authStatus,
  };
});

export const useAuthenticator = shared(
  (): { authenticator: UseAuthenticator } => {
    const { state, authStatus, send } = useAuth();

    const getResult = () => {
      const stateValue = get(state);
      const authStatusValue = get(authStatus);
      const facade = getServiceFacade({ send, state: stateValue });

      return {
        ...facade,
        authStatus: authStatusValue,
        QRFields:
          facade.route === 'setupTotp'
            ? {
                ...getActorContext(stateValue)?.formFields?.setupTotp?.QR,
              }
            : null,
      };
    };
    let result = $state(getResult());
    state.subscribe(() => {
      result = getResult();
    });
    authStatus.subscribe(() => {
      result = getResult();
    });

    return {
      get authenticator() {
        return result;
      },
    };
  }
);
