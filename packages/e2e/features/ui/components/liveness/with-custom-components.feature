Feature: Liveness with Custom Components

  Test Liveness with custom components

  Background:
    Given I'm running the example "ui/components/liveness/with-custom-components/"
  
  @react
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    And I see "Face liveness check"
    And I see "You will go through a face verification process to prove you are a real person."
    And I see "Caution"
    And I see "This check displays colored lights. Use caution if you are photosensitive."
    And I see the "Begin check" button

  @react
  Scenario: The start Screen has the instructions
    Then I see "Instructions to follow to use liveness face detector"
    And I see "Make sure your face is not covered with sunglasses or a mask."
    And I see "Move to a well-lit place that is not in direct sunlight."
    And I see "When an oval appears, completely fill the oval with your face within 5 seconds."
