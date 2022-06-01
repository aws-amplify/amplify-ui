Feature: Color Mode support

  Amplify UI Docs supports both light and dark mode and save user's preference.

  Background:
    Given I'm running the docs page
    Then I see the "color-switcher"

  Scenario: Default to system preference
    And the docs site should be in "System preference"

  Scenario: Preserve light mode preference
    Then I click the "Light mode" button
    And I reload the page
    Then the docs site should be in "Light mode"

  Scenario: Preserve dark mode preference
    Then I click the "Dark mode" button
    And I reload the page
    Then the docs site should be in "Dark mode"

