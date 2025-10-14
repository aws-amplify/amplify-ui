import {
	type AuthenticatorServiceFacade,
	type AuthMachineState,
	type AuthStatus,
	createAuthenticatorMachine,
	defaultAuthHubHandler,
	getActorContext,
	getServiceFacade,
	listenToAuthHub
} from '@aws-amplify/ui';
import { onDestroy } from 'svelte';
import { interpret } from 'xstate';
import { getCurrentUser } from 'aws-amplify/auth';
import { type AnyFn, UseAuth, UseAuthenticator } from '../types';

type SharedReturn<T extends AnyFn = AnyFn> = T;
type StateMachine = ReturnType<typeof createAuthenticatorMachine>;

const getQRFields = (
	facade: AuthenticatorServiceFacade,
	state: AuthMachineState
): { totpIssuer?: string; totpUsername?: string } | null =>
	facade.route === 'setupTotp'
		? {
				...getActorContext(state)?.formFields?.setupTotp?.QR
			}
		: null;

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
	// onDestroy(() => service.stop());
	return service;
};

const useService = (logic: StateMachine) => {
	const serviceRef = useServiceRef(logic);
	const _state = $state({ value: serviceRef.getSnapshot() }) as unknown as {
		value: AuthMachineState;
	};
	const subscription = serviceRef.subscribe(
		(newState) => (_state.value = newState as unknown as AuthMachineState)
	);
	onDestroy(() => subscription.unsubscribe());
	return {
		get state() {
			return _state.value;
		},
		send: serviceRef.send,
		service: serviceRef
	};
};

export const useAuth = shared<() => UseAuth>(() => {
	const machine = createAuthenticatorMachine();
	const actor = $derived.by(() => useService(machine));
	const _authStatus: { value: AuthStatus } = $state({ value: 'configuring' });

	getCurrentUser()
		.then(() => (_authStatus.value = 'authenticated'))
		.catch(() => (_authStatus.value = 'unauthenticated'));
	onDestroy(
		listenToAuthHub(actor.service, (data, service) =>
			defaultAuthHubHandler(data, service, {
				onSignIn: () => (_authStatus.value = 'authenticated'),
				onSignOut: () => (_authStatus.value = 'unauthenticated')
			})
		)
	);

	return {
		get state() {
			return actor.state;
		},
		get send() {
			return actor.send;
		},
		get service() {
			return actor.service;
		},
		get authStatus() {
			return _authStatus.value;
		}
	};
});

export const useAuthenticator = shared<() => UseAuthenticator>(() => {
	let hasInitialized = $state(false);

	const auth = $derived(useAuth());
	const facade = $derived.by(() => getServiceFacade({ send: auth.send, state: auth.state }));
	const qrFields = $derived.by(() => getQRFields(facade, auth.state));

	auth.service.subscribe((newState) => {
		if (newState.matches('setup')) {
			// send an init if it hasn't been sent yet.
			// this is useful, when authenticator not used within the <Authenticator />
			setTimeout(() => {
				if (!hasInitialized) {
					hasInitialized = true;
					auth.send({ type: 'INIT' });
				}
			});
		}
		if (newState.matches('INIT')) {
			hasInitialized = true;
		}
	});

	const result = {
		get state() {
			return auth.state;
		},
		get authStatus() {
			return auth.authStatus;
		},
		get send() {
			return auth.send;
		},
		get service() {
			return auth.service;
		},
		get QRFields() {
			return qrFields;
		}
	};

	for (const key of Object.keys(facade)) {
		Object.defineProperty(result, key, {
			get() {
				const k = key as keyof AuthenticatorServiceFacade;
				return facade[k];
			}
		});
	}
	return result as UseAuthenticator;
});
