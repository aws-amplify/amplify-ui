Feature: Disable Start Screen

  Test Liveness detector without start screen

  Background:
    Given I'm running the example "ui/components/liveness/disable-start-screen/"
  
  @react
  Scenario: See camera module and close with the close icon
      Then I see "Loading"

  @react
  Scenario: See camera module and instructions
      Then I see "connecting"
      Then I see "liveness-detector" element
      Then I see the "Face didn't fit inside oval in time limit." timeout error
      Then I click the "Try again" button
      Then I see "Loading"

  @react
  Scenario: See camera module and instructions with face movement challenge
      Then I see "Update Challenge Selection"
      Then I see "FaceMovementAndLightChallenge"
      Then I click the "FaceMovementAndLightChallenge" selectfield and select the "FaceMovementChallenge" option
      Then I see "FaceMovementChallenge"
      Then I see "liveness-detector" element
