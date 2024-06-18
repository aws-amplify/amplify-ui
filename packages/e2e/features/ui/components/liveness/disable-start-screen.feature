Feature: Disable Start Screen

  Test Liveness detector without start screen

  Background:
    Given I'm running the example "ui/components/liveness/disable-start-screen/"

  @react
  Scenario: See camera module and close with the close icon
      Then I start the websocket server at example 'ui/components/liveness/disable-start-screen/' 
      Then I see "Loading"
      Then I verify the websocket request has query param 'precheck-view-enabled' with value '0'

  @react
  Scenario: See camera module and instructions
      Then I see "connecting"
      Then I see "liveness-detector" element
      Then I see the "Face didn't fit inside oval in time limit." timeout error
      Then I click the "Try again" button
      Then I see "Loading"

  @react
  Scenario: See camera module and instructions with face movement challenge
      Then I see "FaceMovementChallenge"
      Then I see "liveness-detector" element
      Then I see the "Face didn't fit inside oval in time limit." timeout error
      Then I click the "Try again" button
      Then I see "Loading"
