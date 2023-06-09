Feature: Change Password With Overrides

  Developers can customize the default components.

  Background:
    Given I'm running the example "ui/components/account-settings/change-password-with-overrides"

  @react
  Scenario: Customize defsault components
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password:"
    And I see "Custom Current Password label"
    And I see "Custom New Password label"
    And I click the "Sign out" button
    Then I see "Sign in"
