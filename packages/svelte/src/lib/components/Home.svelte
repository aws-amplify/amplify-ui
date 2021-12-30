<script lang="ts">
	import { onDestroy } from 'svelte';
	import { setupMachine, route, toSignUp, toSignIn, signOut } from '$lib/components/store';
	import SignIn from './SignIn.svelte';
	import { Amplify } from 'aws-amplify';
	Amplify.configure({ ssr: true });

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

<div data-amplify-authenticator v-if="!state?.matches('authenticated')">
	<div data-amplify-container>
		<!--Slot header goes here-->
		<div data-amplify-router>
			{#if $route === 'signIn'}
				<SignIn />
			{/if}
			{#if $route === 'signUp'}
				<p>Sign Up</p>
				<button on:click={toSignIn()}>To Sign In</button>
			{/if}
			{#if $route === 'resetPassword'}
				<p>reset password</p>
				<button on:click={toSignIn()}>To Sign In</button>
			{/if}
			{#if $route === 'authenticated'}
				<p>Authenticated</p>
				<button on:click={signOut()}>Sign Out</button>
			{/if}
		</div>
	</div>
</div>

<style>
</style>
