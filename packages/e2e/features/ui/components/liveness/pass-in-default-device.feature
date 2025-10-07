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
  Scenario: Handle invalid deviceId with DEFAULT_CAMERA_NOT_FOUND_ERROR
    Given I set an invalid deviceId "invalid-camera-123"
    When I click the "Start video check" button
    Then I should see a "DEFAULT_CAMERA_NOT_FOUND_ERROR" error
    And the system should fallback to a default camera
    And I should be able to continue with the liveness check

  @pass-in-default-device
  Scenario: Valid deviceId selects correct camera
    Given I set a valid deviceId "valid-camera-456"
    When I click the "Start video check" button
    Then the specified camera should be selected
    And I see "liveness-detector" element
    
  @pass-in-default-device
  Scenario: Device info contains only deviceId, label, and groupId
    Given I set a valid deviceId "test-camera-789"
    When I complete the liveness detection successfully
    Then the device info should contain "deviceId"
    And the device info should contain "label"
    And the device info should contain "groupId"
    And the device info should not contain "deviceLabel"