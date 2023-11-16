Feature: Liveness with Custom Components

Liveness component supports using a custom credential provider.

  Background:
    Given I'm running the example "ui/components/liveness/with-credential-provider/"
  
  @react
  Scenario: See camera module and close with the close icon
      Then I click the "Start video check" button
      Then I click the "close-icon"
      Then I see the "Start video check" button

  @react
  Scenario: See camera module and instructions
      Then I click the "Start video check" button
      Then I see "liveness-detector" element
      Then I see "connecting"
      Then I see "Move closer"
      Then I see "Face didn't fit inside oval in time limit."
      Then I click the "Try again" button
      Then I see the "Start video check" button
