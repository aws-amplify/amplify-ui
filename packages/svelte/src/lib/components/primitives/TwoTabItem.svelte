<script lang="ts">
  import { type HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    active?: boolean;
    id: string;
    label: string;
  }

  const { active = false, id, label, ...rest }: Props = $props();
</script>

<button
  {...rest}
  tabindex={active ? 0 : -1}
  aria-selected={active ? 'true' : 'false'}
  class={{
    'amplify-tabs__item': true,
    'amplify-tabs__item--active': active
  }}
  id={`${id}-tab`}
  aria-controls={`${id}-panel`}
  role="tab"
>
  {label}
</button>
