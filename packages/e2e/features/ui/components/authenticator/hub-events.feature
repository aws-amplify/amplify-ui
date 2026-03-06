
Feature: Hub Events
  Authenticator listens to external Auth Hub events from 'aws-amplify'. For
  example, Authenticator will automatically sign out the user if it gets a
  "signOut" hub event.

  Background:
    Given I'm running the example "/ui/components/authenticator/hub-events"

  # @todo-migration maybe keep this
  # @angular @react @vue @svelte
  Scenario: Unsuccessful token refresh logs out the user
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    When I dispatch "tokenRefresh_failure" event
    Then I see "Sign in"

  # @todo-migration maybe keep this
  # @angular @react @vue @svelte
  Scenario: Successful token refresh calls currentAuthenticatedUser
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Given I spy "Auth.currentAuthenticatedUser" method
    When I dispatch "tokenRefresh" event
    Then "Auth.currentAuthenticatedUser" method is called
