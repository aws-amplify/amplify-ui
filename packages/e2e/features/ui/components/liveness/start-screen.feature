Feature: Liveness Start Screen

  Test Liveness start screen

  Background:
    Given I'm running the example "ui/components/liveness"
  
  @react
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    Then I see "Photosensitivity warning"
    Then I see "Liveness check"
    Then I see "You will go through a face verification process to prove that you are a real person."
    Then I see "This check displays colored lights. Use caution if you are photosensitive."
    Then I see the "Begin check" button

  @react
  Scenario: Click the pop-over icon and see the notes
    Then I click the "popover-icon"
    Then I see "A small percentage of individuals may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition."

  @react
  Scenario: The start Screen has the instructions
    Then I see "Follow the instructions to complete the check:"
    Then I see "Make sure your face is not covered with sunglasses or a mask."
    Then I see "Move to a well-lit place that is not in direct sunlight."
    Then I see "Maximize your screen's brightness."
    Then I see "When an oval appears, follow the instructions to fit your face in it."
