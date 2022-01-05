Feature: Responsive Theme support

  The theme supports responsive breakpoints

  Background:
    Given I'm running the docs page "theming/responsive"

  Scenario: Theme renders breakpoints correctly on responsive demo
    Then the page contains "Object Syntax" section
    And renders "base" breakpoint with appropriate background color "rgb(255, 0, 0)"
    And renders "small" breakpoint with appropriate background color "rgb(255, 165, 0)"
    And renders "medium" breakpoint with appropriate background color "rgb(255, 255, 0)"
    And renders "large" breakpoint with appropriate background color "rgb(0, 128, 0)"
    And renders "xl" breakpoint with appropriate background color "rgb(0, 0, 255)"
    And renders "xxl" breakpoint with appropriate background color "rgb(128, 0, 128)"
    And renders background color "rgb(255, 0, 0)" at 1px less than "small"
    And renders background color "rgb(255, 165, 0)" at 1px less than "medium"
    And renders background color "rgb(255, 255, 0)" at 1px less than "large"
    And renders background color "rgb(0, 128, 0)" at 1px less than "xl"
    And renders background color "rgb(0, 0, 255)" at 1px less than "xxl"
