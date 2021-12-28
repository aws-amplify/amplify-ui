<script >
	import {
		createAuthenticatorMachine,
		getServiceContextFacade,
		getSendEventAliases
	} from '@aws-amplify/ui';
	import { interpret } from 'xstate';

	import '@aws-amplify/ui/styles.css';

	// import { useSelector } from '@xstate/svelte';
	import { onDestroy } from 'svelte';

	const machine = createAuthenticatorMachine({
		initialState: undefined,
		loginMechanisms: undefined,
		services: undefined,
		signUpAttributes: undefined,
		socialProviders: undefined
	});
	let _facade;

	// const { state, send } = useMachine(machine);

	const authService = interpret(machine, {
		devTools: process.env.NODE_ENV === 'development'
	}).start();

	const _subscription = authService.subscribe((state) => {
		_facade = getServiceContextFacade(state);
	});

	const _sendEventAliases = getSendEventAliases(authService.send);
	const _authService = authService;

	onDestroy(() => {
		if (_subscription) _subscription.unsubscribe();
	});

	// const state = useSelector(service, (state) => state.context);

	// const { state, send } = useActor(service);
</script>

<main>
	{#if false}<slot />{/if}

	<div class="container">
		{#if _facade.route === 'signIn'}
			<p>Sign In</p>
		{/if}
		<!-- {$authService.send} -->
		<!-- send: {state} -->
		<!-- state: {send} -->
	</div>
</main>

<style>
	main {
		font-family: sans-serif;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0px 20px;
	}
</style>
