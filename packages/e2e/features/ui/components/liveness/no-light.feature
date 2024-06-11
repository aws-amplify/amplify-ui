Feature: Liveness Detector

  Test Liveness detector with Face Movement challenge

  Background:
    Given I'm running the example "ui/components/liveness"

  @react 
  Scenario: Do not see photosensitivity warning
      I see "Update Challenge Selection"
      Then I see "FaceMovementAndLightChallenge"
      Then I see "Photosensitivity warning"
      Then I click the "FaceMovementAndLightChallenge" selectfield and select the "FaceMovementChallenge" option
      Then I see "FaceMovementChallenge"
      Then I do not see "Photosensitivity warning"

  @react
  Scenario: See camera module and instructions
      I see "Update Challenge Selection"
      Then I see "FaceMovementAndLightChallenge"
      Then I click the "FaceMovementAndLightChallenge" selectfield and select the "FaceMovementChallenge" option
      Then I see "FaceMovementChallenge"
      Then I see "connecting"
      Then I click the "Start video check" button
      Then I see "liveness-detector" element
      Then I see "Move closer"
      Then I see the "Face didn't fit inside oval in time limit." timeout error
      Then I click the "Try again" button
      Then I see the "Start video check" button
