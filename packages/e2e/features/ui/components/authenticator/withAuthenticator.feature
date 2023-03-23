Feature: withAuthenticator

  Higher-Order Component wrapps App with an Authenticator

  Background:
    Given I'm running the example "/ui/components/authenticator/withAuthenticator"

  @react
  Scenario: Application is wrapped with Authenticator
    Then I see "Sign in"

  @react
  Scenario: Application renders when signed in
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
