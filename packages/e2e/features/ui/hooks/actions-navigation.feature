Feature: Navigate action hooks

  The Navigate action hooks work correctly

  Background:
    Given I'm running the example "ui/hooks/actions"
    Then the page contains "Sign In" section

  @react
  Scenario: Navigation anchor action works correctly
    When I click the "hash" button
    Then My url contains "#notes"

  @react
  Scenario: Navigation reload action works correctly
    When I click the "reload" button
    Then My page should be reloaded

  @react
  Scenario: Navigation location change action works correctly
    When I click the "locationChange" button
    Then My url contains "ui/hooks/actions?pageChange"
