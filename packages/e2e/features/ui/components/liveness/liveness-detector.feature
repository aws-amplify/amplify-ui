Feature: Liveness Detector

  Test Liveness detector

  Background:
    Given I'm running the example "ui/components/liveness"

  @react @liveness-react
  Scenario: Navigate with keyboard only
      Then I hit the "enter" key on "Begin check" button
      Then I click the "close-icon"
      # TODO: Change this to use keyboard navigation, at this time it doesnt work the same way begin check does
      Then I see the "Begin check" button
  
  @react @liveness-react
  Scenario: See camera module and close with the close icon
      Then I click the "Begin check" button
      Then I click the "close-icon"
      Then I see the "Begin check" button

  @react @liveness-react
  Scenario: See camera module and instructions
      Then I click the "Begin check" button
      Then I see "liveness-detector" element
      Then I see "connecting"
      Then I see "Move closer"
      Then I see "Face didn't fit inside oval in time limit."
      Then I click the "Try again" button
      Then I see the "Begin check" button
