Feature: Monitoring errors

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/custom-actions"

  @react
  Scenario: Shows custom error boundary when unexpected error happens
    Given I expect an exception
    When I click the first button containing "my-prefix"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Mock unexpected error" menuitem
    When I click the "Mock unexpected error" menuitem
    Then I see "An unexpected error has happened."
