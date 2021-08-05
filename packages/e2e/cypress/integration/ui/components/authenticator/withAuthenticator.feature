Feature: withAuthenticator

  Higher-Order Component gates an application with the Authenticator

  Background:
    Given I'm running the example "/ui/components/authenticator/withAuthenticator"

  @next @react
  Scenario: Application is wrapped with Authenticator
    Then I see "Sign in to your account"

  @focus @next @react @vue @skip
  Scenario: Application renders when signed in
    When I type a valid username "VALID_USERNAME"
    And I type a valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign out"
