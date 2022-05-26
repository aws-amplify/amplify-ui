Feature: Responsive Theme support

  The theme supports responsive breakpoints

  Background:
    Given I'm running the docs page "theming/responsive"
    And the breakpoints example is in view

  Scenario: Theme renders breakpoints correctly on responsive demo
    Then the page contains "Object Syntax" section

    Then the breakpoint is at "base"
    And the background color should be "rgb(255, 0, 0)"

    Then the breakpoint is at "small"
    And the background color should be "rgb(255, 165, 0)"

    Then the breakpoint is at "medium"
    And the background color should be "rgb(255, 255, 0)"

    Then the breakpoint is at "large"
    And the background color should be "rgb(0, 128, 0)"

    Then the breakpoint is at "xl"
    And the background color should be "rgb(0, 0, 255)"

    Then the breakpoint is at "xxl"
    And the background color should be "rgb(128, 0, 128)"

  Scenario: Resizing breakpoints 1px smaller
    Then I downsize the "small" viewport by 1px
    And the background color should be "rgb(255, 0, 0)"

    Then I downsize the "medium" viewport by 1px
    And the background color should be "rgb(255, 165, 0)"

    Then I downsize the "large" viewport by 1px
    And the background color should be "rgb(255, 255, 0)"

    Then I downsize the "xl" viewport by 1px
    And the background color should be "rgb(0, 128, 0)"

    Then I downsize the "xxl" viewport by 1px
    And the background color should be "rgb(0, 0, 255)"
