Feature: withAuthenticator

  Higher-Order Component wrapps App with an Authenticator

  Background:
    Given I'm running the example "/ui/components/authenticator/withAuthenticator"

  @todo-migration @react @react-native
  Scenario: Application is wrapped with Authenticator
    Then I see "Sign in"

  @todo-migration @react @react-native
  Scenario: Application renders when signed in
    When I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
