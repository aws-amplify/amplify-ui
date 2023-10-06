Feature: Delete User

  End users can delete their account after authentication.

  Background:
    Given I'm running the example "ui/components/account-settings/delete-user"

  @todo-migration @react
  Scenario: Delete an authenticated user
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Hello"
    Then I see "Delete Account:"
    Then I click the "Delete Account" button
    Then I see "Deleting your account is not reversible. You will lose access to your account and all data associated with it."
    Then I click the "Delete" button
    Then I see "Sign in"

 @todo-migration @react
  Scenario: Initiate delete but don't confirm deletion
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Hello"
    Then I see "Delete Account:"
    Then I click the "Delete Account" button
    Then I see "Deleting your account is not reversible. You will lose access to your account and all data associated with it."
    Then I click the "Cancel" button
    Then I click the "Sign Out" button
    Then I see "Sign in"

  @todo-migration @react
  Scenario: Delete fails due to cognito error
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with error fixture "delete-user-failure"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Hello"
    Then I see "Delete Account:"
    Then I click the "Delete Account" button
    Then I see "Deleting your account is not reversible. You will lose access to your account and all data associated with it."
    Then I click the "Delete" button
    Then I see 'Error deleting user'
    Then I click the "Sign Out" button
