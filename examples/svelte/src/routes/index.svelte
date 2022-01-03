<script lang="ts">
	import { Amplify } from 'aws-amplify';
	import aws_exports from './aws-exports';
	Amplify.configure({ ...aws_exports, ssr: true });
	import { Authenticator, store } from '@aws-amplify/ui-svelte';
	import '@aws-amplify/ui-svelte/styles.css';
	const { signOut, user } = store;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Authenticator loginMechanisms={['username']}>
	<h1>Hello {$user.username}!</h1>
	<button on:click={signOut}>Sign Out</button>
</Authenticator>
