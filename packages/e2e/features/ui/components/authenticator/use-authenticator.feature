Feature: useAuthenticator Hooks 

  Authenticator provides `useAuthenticator` interface (`AuthenticatorService` 
  in Angular) that you provides access to authenticator states and context.

  Background:
    Given I'm running the example "ui/components/authenticator/use-authenticator"

  @angular @react @vue @todo-react @todo-vue
  Scenario: Sign in footer links to sign up
    When I click the "Create Account" button
    Then I see "Create a new account"

  @angular @react @vue @todo-react @todo-vue
  Scenario: Sign up footer links to sign in
    When I click the "Create Account" button
    And I click the "Back to Sign in" button
    Then I see "Sign in to your account"

  @angular @react @vue @todo-react @todo-vue
  Scenario: Authenticator renders `authenticated` content once signed in
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Welcome"
    And I click the "Sign Out" button
    Then I see "Sign in to your account"
