Feature: Delete User With Overrides

  Developers can customize the delete user page.

  Background:
    Given I'm running the example "ui/components/account-settings/delete-user-display-text"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"

  @react @gen1 @gen2
  Scenario: Customize DeleteUser displayText
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Delete!" button
    Then I see "Maybe don't do it"
    Then I see "Are you sure?"
    Then I click the "Cancel!" button
    Then I click the "Sign Out" button
