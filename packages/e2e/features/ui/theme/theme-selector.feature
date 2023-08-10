Feature: Theme Selector

  Amplify UI Docs provides theme selectors to change the base theme tokens.

  Background:
    Given I'm running the docs page

  Scenario: Change theme to Classic
    Then I see "Theming"
    And I change the theme to "Classic"
    And "Add to cart" button has background color "rgb(4, 52, 149)"

  Scenario: Change theme to terminal
    Then I see "Theming"
    And I change the theme to "Terminal"
    And "Add to cart" button has background color "rgb(76, 203, 104)"
