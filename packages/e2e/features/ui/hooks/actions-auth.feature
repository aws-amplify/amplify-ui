Feature: Auth action hooks

  The Auth action hooks work correctly

  Background:
    Given I'm running the example "ui/hooks/actions"
    Then I see tab "Sign In"

  @react
  Scenario: Signout action works correctly
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see tab "Sign In"
