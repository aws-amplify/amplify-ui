Feature: Liveness with Custom Components

  Test Liveness with custom components

  Background:
    Given I'm running the example "ui/components/liveness/with-custom-components/"
  
  @react @gen1 @gen2
  Scenario: The Start Screen has all the elements
    Then I see "SessionId:"
    Then I see "Center your face"
    Then I see "Caution"
    Then I see "This check displays colored lights. Use caution if you are photosensitive."
    Then I see the "Start video check" button
