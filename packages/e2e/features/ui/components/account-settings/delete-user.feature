Feature: Delete User

  End users can delete their account after authentication.

  Background:
    Given I'm running the example "ui/components/account-settings/delete-user"

  @react
  Scenario: Delete an authenticated user
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Hello"
    And I see "Delete Account:"
    And I click the "Delete Account" button
    Then I see "Deleting your account is not reversable. You will lose access to your account and all data associated with it."
    And I click the "Delete my account" button
    Then I see "Sign in"

 @react
  Scenario: Initiate delete but don't confirm deletion
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with fixture "delete-user"
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Hello"
    And I see "Delete Account:"
    And I click the "Delete Account" button
    Then I see "Deleting your account is not reversable. You will lose access to your account and all data associated with it."
    And I click the "Cancel" button
    And I click the "Sign Out" button
    Then I see "Sign in"

  @react
  Scenario: Delete fails due to cognito error
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.DeleteUser" } }' with error fixture "delete-user-failure"
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Hello"
    And I see "Delete Account:"
    And I click the "Delete Account" button
    Then I see "Deleting your account is not reversable. You will lose access to your account and all data associated with it."
    And I click the "Delete my account" button
    Then I see 'Error deleting user'
    And I click the "Sign Out" button
