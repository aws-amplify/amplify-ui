Feature: A11y

  Test Liveness a11y

  Background:
    Given I'm running the example "ui/components/liveness"
    Given I am testing a11y

  @react @a11y
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    Then I check the page for a11y issues
