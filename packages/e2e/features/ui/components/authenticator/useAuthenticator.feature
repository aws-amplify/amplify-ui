Feature: Headless Usage

  Authenticator supports headless usage that provides access to current authenticator context
  outside the Authenticator component. React and Vue provides it through `useAuthenticator` 
  hook and composable respectively, and Angular provides it through `AuthenticatorService` 
  service. They can be used to access current authState (routes), authenticated user, etc.

  See https://ui.docs.amplify.aws/components/authenticator#headless for details.

  Background:
    Given I'm running the example "/ui/components/authenticator/useAuthenticator"

  @angular @react @vue @todo-angular @todo-vue
  Scenario: Conditionally render Login and Logout component

  /useAuthenticator example uses headless API to get access to conditionally render 
  components for Login and Logout page. Both share the same authenticator context.

    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    When I reload the page
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see "Sign in"

