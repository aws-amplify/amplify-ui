<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte';
  import { get } from 'svelte/store';
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
  import { VERSION } from '../../../version';
  import { type Components } from '../../types';

  import { TwoTabItem, TwoTabs } from '../primitives';
  import {
    ConfirmResetPassword,
    ConfirmSignIn,
    ConfirmSignUp,
    ConfirmVerifyUser,
    ForceNewPassword,
    ForgotPassword,
    SelectMfaType,
    SetupEmail,
    SetupTotp,
    SignIn,
    SignUp,
    VerifyUser
  } from '.';

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
        },
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
    children,
  }: AuthenticatorProps = $props();

  let clearUserAgent: () => void;

  const auth = useAuth();
  const { authenticator } = $derived(useAuthenticator());
  const isSetup = $derived(authenticator.route === 'setup');

  $effect(() => {
    if (isSetup) {
      auth.send({
        type: 'INIT',
        data: {
          initialState,
          loginMechanisms,
          socialProviders,
          signUpAttributes,
          services,
          formFields,
        },
      });
    }
  });

  onMount(() => {
    clearUserAgent = setUserAgent({
      componentName: 'Authenticator',
      packageName: 'svelte',
      version: VERSION,
    });
  });

  onDestroy(() => {
    clearUserAgent?.();
  });

  // text util
  const { getSignInTabText, getSignUpTabText } = authenticatorTextUtil;

  // computed
  const signInLabel = $derived(getSignInTabText());
  const createAccountLabel = $derived(getSignUpTabText());

  // methods
  const hasTabs = $derived(
    authenticator.route === 'signIn' || authenticator.route === 'signUp'
  );

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
        'verifyUser',
      ] as AuthenticatorRoute[]
    ).includes(authenticator.route)
  );
</script>

{#if hasRouteComponent}
  <div data-amplify-authenticator data-variation={variation}>
    <div data-amplify-container>
      {@render components?.Header?.()}
      <div
        data-amplify-router
        data-amplify-router-content={hasTabs ? undefined : ''}
      >
        {#if hasTabs && !hideSignUp}
          <TwoTabs>
            <TwoTabItem
              active={authenticator.route === 'signIn'}
              id="signIn"
              label={signInLabel}
              onclick={authenticator.toSignIn}
            />
            <TwoTabItem
              active={authenticator.route === 'signUp'}
              id="signUp"
              label={createAccountLabel}
              onclick={authenticator.toSignUp}
            />
          </TwoTabs>
        {/if}
        {#if hasTabs}
          <div data-amplify-router-content>
            {#if authenticator.route === 'signIn'}
              <SignIn
                id="signIn-panel"
                role="tabpanel"
                class="amplify-tabs__panel amplify-tabs__panel--active"
                aria-labelledby="signIn-tab"
                components={components?.SignIn}
              />
            {/if}
            {#if authenticator.route === 'signUp' && !hideSignUp}
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
        {#if authenticator.route === 'confirmSignUp'}
          <ConfirmSignUp components={components?.ConfirmSignUp} />
        {:else if authenticator.route === 'forgotPassword'}
          <ForgotPassword components={components?.ForgotPassword} />
        {:else if authenticator.route === 'confirmResetPassword'}
          <ConfirmResetPassword components={components?.ConfirmResetPassword} />
        {:else if authenticator.route === 'confirmSignIn'}
          <ConfirmSignIn components={components?.ConfirmSignIn} />
        {:else if authenticator.route === 'setupTotp'}
          <SetupTotp components={components?.SetupTotp} />
        {:else if authenticator.route === 'forceNewPassword'}
          <ForceNewPassword components={components?.ForceNewPassword} />
        {:else if authenticator.route === 'verifyUser'}
          <VerifyUser components={components?.VerifyUser} />
        {:else if authenticator.route === 'confirmVerifyUser'}
          <ConfirmVerifyUser components={components?.ConfirmVerifyUser} />
        {:else if authenticator.route === 'selectMfaType'}
          <SelectMfaType components={components?.SelectMfaType} />
        {:else if authenticator.route === 'setupEmail'}
          <SetupEmail components={components?.SetupEmail} />
        {/if}
      </div>
      {@render components?.Footer?.()}
    </div>
  </div>
{/if}
{#if authenticator.route === 'authenticated'}
  {@render children?.({
    user: authenticator.user,
    state: get(auth.state),
    signOut: authenticator.signOut,
    send: auth.send,
  })}
{/if}
