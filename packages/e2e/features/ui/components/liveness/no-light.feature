Feature: Liveness Detector

  Test Liveness detector with Face Movement challenge

  Background:
    Given I'm running the example "ui/components/liveness"

  @react 
  Scenario: Do not see photosensitivity warning
      Then I see "Update Challenge Selection"
      Then I see "FaceMovementAndLightChallenge"
      Then I see "Photosensitivity warning"
      Then I click the "FaceMovementAndLightChallenge" selectfield and select the "FaceMovementChallenge" option
      Then I see "FaceMovementChallenge"
      Then I do not see "Photosensitivity warning"

  @react
  Scenario: See camera module and instructions
      Then I see "Update Challenge Selection"
      Then I see "FaceMovementAndLightChallenge"
      Then I click the "FaceMovementAndLightChallenge" selectfield and select the "FaceMovementChallenge" option
      Then I see "FaceMovementChallenge"
      Then I see "connecting"
      Then I click the "Start video check" button
      Then I see "liveness-detector" element
