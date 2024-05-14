Feature: Liveness Start Screen

  Test Liveness start screen

  Background:
    Given I'm running the example "ui/components/liveness"
  
  @react
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    Then I see "Photosensitivity warning"
    Then I see "Center your face"
    Then I see the "Start video check" button

  @react
  Scenario: Click the pop-over icon and see the notes
    Then I click the "popover-icon"
    Then I see "Some people may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition."
