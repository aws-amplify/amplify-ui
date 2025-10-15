<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte';
  import {
    type AuthenticatorMachineOptions,
    type AuthenticatorRoute,
    authenticatorTextUtil,
    type AuthFormFields,
    type AuthMachineState,
    setUserAgent,
    type SocialProvider
  } from '@aws-amplify/ui';
  import { type AuthUser } from '@aws-amplify/auth';

  import { useAuth, useAuthenticator } from '../../stores/authenticator.svelte';
  import { VERSION } from '../../version';
  import { type Components } from '../../types';
  import TwoTabs from '../primitives/TwoTabs.svelte';
  import TwoTabItem from '../primitives/TwoTabItem.svelte';
  import SignIn from './SignIn.svelte';
  import SignUp from './SignUp.svelte';
  import ConfirmSignUp from './ConfirmSignUp.svelte';
  import ForgotPassword from './ForgotPassword.svelte';
  import ConfirmResetPassword from './ConfirmResetPassword.svelte';
  import ConfirmSignIn from './ConfirmSignIn.svelte';
  import SetupTotp from './SetupTotp.svelte';
  import ForceNewPassword from './ForceNewPassword.svelte';
  import VerifyUser from './VerifyUser.svelte';
  import ConfirmVerifyUser from './ConfirmVerifyUser.svelte';
  import SelectMfaType from './SelectMfaType.svelte';
  import SetupEmail from './SetupEmail.svelte';

  interface ComponentsProvider extends Components {
    ConfirmSignIn?: Components;
    ConfirmSignUp?: Components;
    ConfirmResetPassword?: Components;
    ConfirmVerifyUser?: Components;
    ForceNewPassword?: Components;
    ForgotPassword?: Components;
    SelectMfaType?: Components;
    SetupEmail?: Components;
    SetupTotp?: Components;
    SignIn?: Components;
    SignUp?: Components;
    VerifyUser?: Components;
  }

  interface AuthenticatorProps {
    components?: ComponentsProvider;
    initialState?: AuthenticatorMachineOptions['initialState'];
    loginMechanisms?: AuthenticatorMachineOptions['loginMechanisms'];
    variation?: 'default' | 'modal';
    services?: AuthenticatorMachineOptions['services'];
    signUpAttributes?: AuthenticatorMachineOptions['signUpAttributes'];
    socialProviders?: SocialProvider[];
    hideSignUp?: boolean;
    formFields?: AuthFormFields;
    children?: Snippet<
      [
        {
          user: AuthUser;
          state: AuthMachineState;
          signOut: () => void;
          send: ReturnType<typeof useAuth>['send'];
        }
      ]
    >;
  }

  const {
    components,
    initialState,
    loginMechanisms,
    variation = 'default',
    services,
    signUpAttributes,
    socialProviders,
    hideSignUp,
    formFields,
    children
  }: AuthenticatorProps = $props();

  let clearUserAgent: () => void;

  let hasInitialized = $state(false);

  const {
    send,
    service,
    state: _state,
    route,
    signOut,
    toSignIn,
    toSignUp,
    user
  } = $derived(useAuthenticator());
  /**
   * Subscribes to state machine changes and sends INIT event
   * once machine reaches 'setup' state.
   */
  const unsubscribeMachine = service.subscribe((newState) => {
    if (newState.matches('setup') && !hasInitialized) {
      send({
        type: 'INIT',
        data: {
          initialState,
          loginMechanisms,
          socialProviders,
          signUpAttributes,
          services,
          formFields
        }
      });
      hasInitialized = true;
    }
  }).unsubscribe;

  onMount(() => {
    clearUserAgent = setUserAgent({
      componentName: 'Authenticator',
      packageName: 'svelte',
      version: VERSION
    });
  });

  onDestroy(() => {
    clearUserAgent?.();
    unsubscribeMachine();
  });

  // text util
  const { getSignInTabText, getSignUpTabText } = authenticatorTextUtil;

  // computed
  const signInLabel = $derived(getSignInTabText());
  const createAccountLabel = $derived(getSignUpTabText());

  // methods
  const hasTabs = $derived(route === 'signIn' || route === 'signUp');

  const hasRouteComponent = $derived(
    (
      [
        'confirmResetPassword',
        'confirmSignIn',
        'confirmSignUp',
        'confirmVerifyUser',
        'forceNewPassword',
        'forgotPassword',
        'selectMfaType',
        'setupEmail',
        'setupTotp',
        'signIn',
        'signUp',
        'verifyUser'
      ] as AuthenticatorRoute[]
    ).includes(route)
  );
</script>

{#if hasRouteComponent}
  <div data-amplify-authenticator data-variation={variation}>
    <div data-amplify-container>
      {@render components?.Header?.()}
      <div data-amplify-router data-amplify-router-content={hasTabs ? undefined : ''}>
        {#if hasTabs && !hideSignUp}
          <TwoTabs>
            <TwoTabItem
              active={route === 'signIn'}
              id="signIn"
              label={signInLabel}
              onclick={toSignIn}
            />
            <TwoTabItem
              active={route === 'signUp'}
              id="signUp"
              label={createAccountLabel}
              onclick={toSignUp}
            />
          </TwoTabs>
        {/if}
        {#if hasTabs}
          <div data-amplify-router-content>
            {#if route === 'signIn'}
              <SignIn
                id="signIn-panel"
                role="tabpanel"
                class="amplify-tabs__panel amplify-tabs__panel--active"
                aria-labelledby="signIn-tab"
                components={components?.SignIn}
              />
            {/if}
            {#if route === 'signUp' && !hideSignUp}
              <SignUp
                id="signUp-panel"
                class="amplify-tabs__panel amplify-tabs__panel--active"
                role="tabpanel"
                aria-labelledby="signUp-tab"
                components={components?.SignUp}
              />
            {/if}
          </div>
        {/if}
        {#if route === 'confirmSignUp'}
          <ConfirmSignUp components={components?.ConfirmSignUp} />
        {:else if route === 'forgotPassword'}
          <ForgotPassword components={components?.ForgotPassword} />
        {:else if route === 'confirmResetPassword'}
          <ConfirmResetPassword components={components?.ConfirmResetPassword} />
        {:else if route === 'confirmSignIn'}
          <ConfirmSignIn components={components?.ConfirmSignIn} />
        {:else if route === 'setupTotp'}
          <SetupTotp components={components?.SetupTotp} />
        {:else if route === 'forceNewPassword'}
          <ForceNewPassword components={components?.ForceNewPassword} />
        {:else if route === 'verifyUser'}
          <VerifyUser components={components?.VerifyUser} />
        {:else if route === 'confirmVerifyUser'}
          <ConfirmVerifyUser components={components?.ConfirmVerifyUser} />
        {:else if route === 'selectMfaType'}
          <SelectMfaType components={components?.SelectMfaType} />
        {:else if route === 'setupEmail'}
          <SetupEmail components={components?.SetupEmail} />
        {/if}
      </div>
      {@render components?.Footer?.()}
    </div>
  </div>
{/if}
{#if route === 'authenticated'}
  {@render children?.({ user, state: _state, signOut, send })}
{/if}
