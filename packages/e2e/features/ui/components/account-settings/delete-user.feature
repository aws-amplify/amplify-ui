Feature: Delete User

  End users can delete their account.

  Background:
    Given I'm running the example "ui/components/account-settings/delete-user"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"

  @react
  Scenario: Delete an authenticated user
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Hello"
    And I see "Delete Account:"
    And I click the "Delete Account" button
    Then I see "Deleting your account is not reversable. You will lose access to your account and all data associated with it."
    And I click the "Delete my account" button
    Then I see "Sign in"

 @react
  Scenario: Initiate delete but cancel at the last step
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Hello"
    And I see "Delete Account:"
    And I click the "Delete Account" button
    Then I see "Deleting your account is not reversable. You will lose access to your account and all data associated with it."
    And I click the "Cancel" button
    And I click the "Sign Out" button
    Then I see "Sign in"
