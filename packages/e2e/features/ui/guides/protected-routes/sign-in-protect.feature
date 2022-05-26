Feature: Sign in protected feature guide

  Checks the protected feature guide

  Background:
    Given I'm running the example "/"
    Then I see tab "Sign In"

  @guides
  Scenario: Verify redirect to protected route after logging in
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see tab "Sign In"
