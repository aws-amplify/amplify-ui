<script>
	import { onDestroy } from 'svelte';
	import { setupMachine, route, toSignUp, toSignIn } from '$lib/components/store';

	import '@aws-amplify/ui/styles.css';

	export let initialState = undefined;
	export let loginMechanisms = undefined;
	export let services = undefined;
	export let signUpAttributes = undefined;
	export let socialProviders = undefined;

	const _subscription = setupMachine(
		initialState,
		loginMechanisms,
		services,
		signUpAttributes,
		socialProviders
	);

	onDestroy(() => {
		if (_subscription) _subscription.unsubscribe();
	});
</script>

<main>
	<div class="container">
		{#if $route === 'signIn'}
			<p>Sign In</p>
			<button on:click={toSignUp()}>To Sign Up</button>
		{/if}
		{#if $route === 'signUp'}
			<p>Sign Up</p>
			<button on:click={toSignIn()}>To Sign In</button>
		{/if}
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
