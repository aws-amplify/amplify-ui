Feature: Disable Start Screen

  Test Liveness detector without start screen

  Background:
    Given I'm running the example "ui/components/liveness/disable-start-screen/"
  
  @react
  Scenario: See camera module and close with the close icon
      Then I see "Loading"

  @react
  Scenario: See camera module and instructions
      And I see "liveness-detector" element
      And I see "connecting"
      And I see "Face didn't fill oval within time limit."
      And I click the "Try again" button
      And I see "Loading"
