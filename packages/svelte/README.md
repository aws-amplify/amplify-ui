# @aws-amplify/ui-svelte

Svelte components for Amplify UI

## Installation

```bash
npm install @aws-amplify/ui-svelte aws-amplify
```

or

```bash
yarn add @aws-amplify/ui-svelte aws-amplify
```

## Usage

### Basic Usage

```svelte
<script>
	import { Amplify } from 'aws-amplify';
	import { Authenticator } from '@aws-amplify/ui-svelte';
	import '@aws-amplify/ui/styles.css';
	import awsExports from './aws-exports';

	Amplify.configure(awsExports);
</script>

<Authenticator let:user let:signOut>
	<h1>Hello {user.username}</h1>
	<button on:click={signOut}>Sign out</button>
</Authenticator>
```

### Using with TypeScript

```svelte
<script lang="ts">
	import { Amplify } from 'aws-amplify';
	import { Authenticator } from '@aws-amplify/ui-svelte';
	import type { AuthUser } from '@aws-amplify/ui-svelte';
	import '@aws-amplify/ui/styles.css';
	import awsExports from './aws-exports';

	Amplify.configure(awsExports);

	let user: AuthUser;
	let signOut: () => void;
</script>

<Authenticator let:user let:signOut>
	<h1>Hello {user.username}</h1>
	<button on:click={signOut}>Sign out</button>
</Authenticator>
```

### Customization

The Authenticator component provides several props for customization:

```svelte
<Authenticator
	initialRoute="signIn"
	socialProviders={['google', 'facebook', 'amazon']}
	hideSignUp={false}
>
	<!-- Your app content -->
</Authenticator>
```

### Using the useAuthenticator Store

You can also access the authenticator state directly using the store:

```svelte
<script>
	import { useAuthenticatorStore } from '@aws-amplify/ui-svelte';

	const authenticator = useAuthenticatorStore();

	$: ({ user, authStatus, signOut } = $authenticator);
</script>

{#if authStatus === 'authenticated'}
	<h1>Welcome {user.username}</h1>
	<button on:click={signOut}>Sign out</button>
{:else}
	<p>Please sign in</p>
{/if}
```

## Components

### Authenticator

The main component that provides the complete authentication flow.

**Props:**

- `initialRoute`: Initial route to display ('signIn' | 'signUp')
- `socialProviders`: Array of social providers to display
- `hideSignUp`: Whether to hide the sign up tab

**Slot Props:**

- `user`: The authenticated user object
- `authStatus`: Current authentication status
- `signOut`: Function to sign out the user

### Primitive Components

The package also exports primitive components that can be used to build custom UI:

- `Button`
- `TextField`
- `PasswordField`

## Styling

Amplify UI uses CSS variables for theming. You can customize the appearance by overriding these variables:

```css
:root {
	--amplify-colors-brand-primary: #ff6347;
	--amplify-colors-brand-secondary: #ff7f50;
}
```

## SvelteKit Support

When using with SvelteKit, make sure to configure SSR appropriately:

```javascript
// app.html
<script>
  if (typeof window !== 'undefined') {
    window.global = window;
  }
</script>
```

## TypeScript Support

This package includes TypeScript definitions. No additional setup is required.

## License

[Apache-2.0](https://github.com/aws-amplify/amplify-ui/blob/main/LICENSE)
