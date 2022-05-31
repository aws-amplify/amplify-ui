Feature: Sign in protected feature guide

  Checks the protected feature guide

  Background:
    Given I'm running the example "/login"

  @guides
  Scenario: Verify redirect to protected route after logging in
    When I click the "First Protected Route" button
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "FIRST PROTECTED ROUTE!"

@guides
  Scenario: Verify redirect to second protected route after logging in
    When I click the "Second Protected Route" button
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "SECOND PROTECTED ROUTE"
