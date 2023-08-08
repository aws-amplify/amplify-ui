Feature: Liveness with Custom Components

Liveness component supports using a custom credential provider.

  Background:
    Given I'm running the example "ui/components/liveness/with-credential-provider/"
  
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
      And I see "Move closer"
      And I see "Face didn't fill oval within time limit."
      And I click the "Try again" button
      Then I see the "Begin check" button
