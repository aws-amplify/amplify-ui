Feature: Pass-in Default Device for Liveness Detection

  Test the pass-in default device example for liveness detection

  Background:
    Given I'm running the example "ui/components/liveness/pass-in-default-device"

  @pass-in-default-device
  Scenario: Basic liveness detection interface loads
    Then I see "Pass-in Default Device Example"
    Then I see "FaceMovementAndLightChallenge"
    Then I see the "Start video check" button

  @pass-in-default-device
  Scenario: Challenge selection is available
    Then I see "FaceMovementAndLightChallenge"
    Then I see "FaceMovementChallenge"

  @pass-in-default-device
  Scenario: Liveness detector can be started
    Then I click the "Start video check" button
    Then I see "liveness-detector" element

  @pass-in-default-device
  Scenario: Liveness detector can be cancelled
    Then I click the "Start video check" button
    Then I click the "close-icon"
    Then I see the "Start video check" button

  @pass-in-default-device
  Scenario: Handle invalid deviceId with no error and no start button
    Given I detect available cameras
    And I set an invalid deviceId "invalid-camera-123"
    Then I should not see the "Start video check" button

  @pass-in-default-device
  Scenario: Valid deviceId selects correct camera
    Given I detect available cameras
    And I set a valid deviceId "valid-camera-456"
    When I click the "Start video check" button
    Then the specified camera should be selected
    And I see "liveness-detector" element