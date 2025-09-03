Feature: Pass In Default Device Info

  Test Liveness detector with default device configuration

  Background:
    Given I'm running the example "ui/components/liveness/pass-in-default-device/"

  @react
  Scenario: Device configuration section is visible
    Then I see "Device Configuration"
    Then I see "Configure default device settings for the liveness detector"
    Then I see "Use preset device"
    Then I see "Use custom device (for testing not found scenarios)"
    Then I see "Device ID"
    Then I see "Device Label"

  @react
  Scenario: Preset device selection works
    Then I see "Use preset device"
    Then I see the "Device ID" selectfield
    Then I click the "Device ID" selectfield and select the "device-1" option
    Then I see "Device ID: device-1" 
    Then I click the "Device Label" selectfield and select the "Default Camera" option
    Then I see "Device label takes precedence over device ID"

  @react
  Scenario: Custom device configuration works
    Then I click the "custom-device" radio button
    Then I see the "Custom Device ID" textfield
    Then I see the "Custom Device Label" textfield
    Then I type a new "Custom Device ID" with value "my-custom-device"
    Then I type a new "Custom Device Label" with value "My Custom Camera"
    Then I see "Device ID: my-custom-device"
    Then I see "Device Label: My Custom Camera"

  @react
  Scenario: Current configuration is displayed correctly
    Then I see "Current Configuration:"
    Then I see "Device ID: Not specified"
    Then I see "Device Label: Not specified"

  @react  
  Scenario: Session information and challenge selection are present
    Then I see "SessionId:"
    Then I see "Update Challenge Selection"
    Then I see "FaceMovementAndLightChallenge"

  @react
  Scenario: Device activity log appears when devices are configured
    Then I click the "Device ID" selectfield and select the "device-2" option
    Then I see "Current Configuration:"
    Then I see "Device ID: device-2"

  @react
  Scenario: Clear log functionality works
    Then I see "Device Activity Log"
    Then I see the "Clear Log" button

  @react
  Scenario: Liveness detector integrates with device configuration
    Then I click the "Device Label" selectfield and select the "External USB Camera" option
    Then I see "Device Label: External USB Camera"
    Then I see "connecting"
    Then I click the "Start video check" button
    Then I see "liveness-detector" element

  @react
  Scenario: Custom device shows not found behavior
    Then I click the "custom-device" radio button
    Then I type a new "Custom Device ID" with value "non-existent-device"
    Then I see "Device ID: non-existent-device"
    Then I see "connecting"
    Then I click the "Start video check" button
    Then I see "liveness-detector" element
