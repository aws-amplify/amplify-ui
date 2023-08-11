Feature: Theme Selector

  Amplify UI Docs provides theme selectors to change the base theme tokens.

  Background:
    Given I'm running the docs page

  Scenario: Change theme to Classic
    Then I see "Theming"
    Then I change the theme to "Classic"
    Then "Add to cart" button has background color "rgb(4, 52, 149)"

  Scenario: Change theme to terminal
    Then I see "Theming"
    Then I change the theme to "Terminal"
    Then "Add to cart" button has background color "rgb(76, 203, 104)"
