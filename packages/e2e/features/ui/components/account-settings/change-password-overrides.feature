Feature: Change Password With Overrides

  Developers can customize the default components.

  Background:
    Given I'm running the example "ui/components/account-settings/change-password-with-overrides"

  @todo-migration @react
  Scenario: Customize defsault components
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Change Password:"
    Then I see "Custom Current Password label"
    Then I see "Custom New Password label"
    Then I click the "Sign out" button
    Then I see "Sign in"
