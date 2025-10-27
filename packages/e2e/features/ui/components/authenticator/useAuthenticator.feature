Feature: Headless Usage

  Authenticator supports headless usage that provides access to current authenticator context
  outside the Authenticator component. React and Vue provides it through `useAuthenticator`
  hook and composable respectively, and Angular provides it through `AuthenticatorService`
  service. They can be used to access current authState (routes), authenticated user, etc.

  See https://ui.docs.amplify.aws/react/components/authenticator/customization#headless for details.

  Background:
    Given I'm running the example "/ui/components/authenticator/useAuthenticator"

  @angular @react @vue @svelte
  Scenario: Conditionally render Login and Logout component

  /useAuthenticator example uses headless API to get access to conditionally render
  components for Login and Logout page. Both share the same authenticator context.

    When I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Navigate to Home"
    Then I click the "Navigate to Home" button
    Then I see a valid greetings message
    Then I reload the page
    Then I see a valid greetings message
    Then I click the "Sign Out" button
    Then I see "Sign In"

