Feature: Responsive Theme support

  The theme supports responsive breakpoints

  Background:
    Given I'm running the docs page "theming/responsive"

  @react
  Scenario: Testing 123
    Then the page contains "Object Syntax"
