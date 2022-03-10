Feature: Sign In with Force New Password flow

  Amplify's SignIn component will redirect end users to force-new-password 
  screen if their account is on "FORCE_CHANGE_PASSWORD" state.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"

  @angular @react @vue 
  Scenario: Back to Sign In works in the FORCE_CHANGE_PASSWORD state
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    And I should see the Force Change Password screen
    And I click the "Back to Sign In" button
    And I see "Sign In"

  @angular @react @vue 
  Scenario: Sign in using a valid phone number and password and user is in a FORCE_CHANGE_PASSWORD state
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I should see the Force Change Password screen

  @angular @react @vue 
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters an invalid new password
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I should see the Force Change Password screen
    And I type an invalid password
    And I confirm my password
    And I click the "Change Password" button
    Then I see "Your passwords must match"
