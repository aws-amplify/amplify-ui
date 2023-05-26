Feature: Delete User With Overrides

  Developers can customize the delete user page.

  Background:
    Given I'm running the example "ui/components/account-settings/delete-user-with-overrides"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"

  @react
  Scenario: Customize warning view
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    And I see "Delete Account:"
    And I click the "Delete Account" button
    Then I see "Deleting your account is not reversable. Please type delete below if you want to confirm user deletion."
    And I click the "Back" button
