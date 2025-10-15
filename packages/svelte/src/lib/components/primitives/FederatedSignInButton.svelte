<script lang="ts">
  import { type HTMLButtonAttributes } from 'svelte/elements';
  import { useAuthenticator } from '../../stores/authenticator.svelte';

  import Button from '../controls/Button.svelte';

  interface Props extends HTMLButtonAttributes {
    provider: string;
  }

  const { provider, children }: Props = $props();

  const { toFederatedSignIn } = useAuthenticator();

  // Methods
  const onClick = (): void => {
    toFederatedSignIn({ provider });
  };
</script>

<Button class="amplify-authenticator__federated-button" type="button" onclick={() => onClick()}>
  {@render children?.()}
</Button>
