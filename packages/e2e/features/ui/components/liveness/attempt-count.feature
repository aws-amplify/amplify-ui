Feature: Liveness Detector

  Test Liveness detector telemetry

  Background:
    Given I'm running the example "ui/components/liveness/"

  @react
  Scenario: Attempt count
      Then I start the websocket server at example "ui/components/liveness/" 
      Then I verify the websocket request has query param 'attempt-count' with value '1'
      Then I see "connecting"
      Then I see "FaceMovementAndLightChallenge"
      Then I click the "FaceMovementAndLightChallenge" selectfield and select the "FaceMovementChallenge" option
      Then I see "FaceMovementChallenge"
      Then I verify the websocket request has query param 'attempt-count' with value '2'
      Then I see "connecting"
