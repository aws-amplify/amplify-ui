Feature: Responsive Theme support

  The theme supports responsive breakpoints

  Background:
    Given I'm running the docs page "theming/responsive"
    Then the breakpoints example is in view

  Scenario: Theme renders breakpoints correctly on responsive demo
    Then the page contains "Object Syntax" section

    Then the breakpoint is at "base"
    Then the background color should be "rgb(255, 0, 0)"

    Then the breakpoint is at "small"
    Then the background color should be "rgb(255, 165, 0)"

    Then the breakpoint is at "medium"
    Then the background color should be "rgb(255, 255, 0)"

    Then the breakpoint is at "large"
    Then the background color should be "rgb(0, 128, 0)"

    Then the breakpoint is at "xl"
    Then the background color should be "rgb(0, 0, 255)"

    Then the breakpoint is at "xxl"
    Then the background color should be "rgb(128, 0, 128)"

  Scenario: Resizing breakpoints 1px smaller
    Then I downsize the "small" viewport by 1px
    Then the background color should be "rgb(255, 0, 0)"

    Then I downsize the "medium" viewport by 1px
    Then the background color should be "rgb(255, 165, 0)"

    Then I downsize the "large" viewport by 1px
    Then the background color should be "rgb(255, 255, 0)"

    Then I downsize the "xl" viewport by 1px
    Then the background color should be "rgb(0, 128, 0)"

    Then I downsize the "xxl" viewport by 1px
    Then the background color should be "rgb(0, 0, 255)"
