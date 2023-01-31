Feature: Liveness Detector

  Test Liveness detector

  Background:
    Given I'm running the example "ui/components/liveness"
  
  @react
  Scenario: See camera module and close with the close icon
      Then I click the "Begin check" button
      And I click the "close-icon"
      Then I see the "Begin check" button

  @react
  Scenario: See camera module and instructions
      Then I click the "Begin check" button
      And I see "liveness-detector" element
      And I see "connecting"
      And I see "Hold face position during countdown"
      And I see "liveness-camera-countdown-timer" element
      And I see "Ensure only one face is in front of camera and avoid moving closer during countdown."
      And I click the "Try again" button
      Then I see the "Begin check" button
