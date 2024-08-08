Feature: withAuthenticator

  Higher-Order Component wrapps App with an Authenticator

  Background:
    Given I'm running the example "/ui/components/authenticator/withAuthenticator"

  @react @react-native @gen1 @gen2
  Scenario: Application is wrapped with Authenticator
    Then I see "Sign in"

  @react @react-native @gen1 @gen2
  Scenario: Application renders when signed in
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
