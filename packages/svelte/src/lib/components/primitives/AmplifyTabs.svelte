<script lang="ts">
  import SignIn from '../SignIn.svelte';
  import SignUp from '../SignUp.svelte';
  import { toSignIn, toSignUp } from '$lib/components/authStore';

  //tab list
  let tabs = [
    {
      active: true,
      labelledById: '1',
      id: '1',
      title: 'Sign In',
      tabIndex: 0,
      component: SignIn,
    },
    {
      active: false,
      labelledById: '2',
      id: '2',
      title: 'Sign Up',
      tabIndex: -1,
      component: SignUp,
    },
  ];

  function handleTabClick(e) {
    if (e.id === '1') {
      toSignIn();
    } else {
      toSignUp();
    }
    tabs = tabs.map((tab) => {
      if (tab.id === e.id) {
        return { ...tab, active: true };
      } else {
        return { ...tab, active: false };
      }
    });
  }
</script>

<div
  tabindex="0"
  aria-orientation="horizontal"
  data-orientation="horizontal"
  role="tablist"
  style="outline: none"
>
  <div
    class="amplify-flex amplify-tabs"
    data-indicator-position="top"
    style="gap: 0px; justify-content: center"
  >
    {#each tabs as tab}
      <div
        class="amplify-tabs-item"
        data-spacing="equal"
        data-orientation="horizontal"
        role="tab"
        id={tab.labelledById}
        tabindex={tab.active ? 0 : 1}
        aria-selected={tab.active}
        aria-controls={tab.id}
        data-state={tab.active ? 'active' : 'inactive'}
        on:click={() => handleTabClick(tab)}
      >
        {tab.title}
      </div>
    {/each}
  </div>
</div>

<slot {tabs} />
