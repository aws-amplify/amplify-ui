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
      And I see "Hold face position during countdown"
      And I see "liveness-camera-countdown-timer" element
      And I see "Ensure only one face is in front of camera and avoid moving closer during countdown."
      And I click the "Try again" button
      And I see "Loading"
