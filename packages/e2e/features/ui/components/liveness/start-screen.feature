Feature: Liveness Start Screen

  Test Liveness start screen

  Background:
    Given I'm running the example "ui/components/liveness"
  
  @react
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    And I see "Photosensitivity warning"
    And I see "Liveness check"
    And I see "You will go through a face verification process to prove you are a real person."
    And I see "This check displays colored lights. Use caution if you are photosensitive."
    And I see the "Begin check" button

  @react
  Scenario: THe start Screen has the instructions
    Then I see "Follow the instructions to complete the check:"
    And I see "Make sure your face is not covered with sunglasses or a mask."
    And I see "Move to a well-lit place that is not dark or in direct sunlight."
    And I see "Increase the brightness of your display screen to maximum level possible."
    And I see "When check starts, fit face in oval, and hold for colored lights."
