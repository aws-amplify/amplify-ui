<script>
	import Authenticator from '$lib/components/Authenticator.svelte';
	import '$lib/styles.css';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Authenticator loginMechanisms={['email']} />
