Feature: Change Password

  End users can change their password.

  Background:
    Given I'm running the example "ui/components/account-settings/change-password"

  @react
  Scenario: Change password of an authenticated user
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password:"
    And I type my current password
    And I type my new password
    And I confirm my password
    And I click the "Update password" button
    Then I see "Password has been changed successfully."
    And I click the "Sign out" button
    Then I see "Sign in"

  @react
  Scenario: Change password with wrong password requirements
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password:"
    And I type my current password
    And I type an invalid wrong complexity new password
    And I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have upper case letters"
    Then I see "Password must have at least 8 characters"
