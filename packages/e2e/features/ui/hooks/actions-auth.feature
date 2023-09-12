Feature: Auth action hooks

  The Auth action hooks work correctly

  Background:
    Given I'm running the example "ui/hooks/actions"
    Then I see tab "Sign In"

  @react
  Scenario: Signout action works correctly
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see tab "Sign In"
