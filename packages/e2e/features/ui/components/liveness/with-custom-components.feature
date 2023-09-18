Feature: Liveness with Custom Components

  Test Liveness with custom components

  Background:
    Given I'm running the example "ui/components/liveness/with-custom-components/"
  
  @liveness-react
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    Then I see "Face liveness check"
    Then I see "You will go through a face verification process to prove that you are a real person."
    Then I see "Caution"
    Then I see "This check displays colored lights. Use caution if you are photosensitive."
    Then I see the "Begin check" button

  @liveness-react
  Scenario: The start Screen has the instructions
    Then I see "Instructions to follow to use liveness face detector"
    Then I see "Make sure your face is not covered with sunglasses or a mask."
    Then I see "Move to a well-lit place that is not dark or in direct sunlight."
