Feature: Sign In with Force New Password flow

  Amplify's SignIn component will redirect end users to force-new-password 
  screen if their account is on "FORCE_CHANGE_PASSWORD" state.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"


  @angular @react @vue 
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and gets an error that's translated
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I should see the Force Change Password screen
    And I type a short password
    And I confirm my short password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with error fixture "force-change-password-phone-failure"
    Then I click the "Change Password" button
    Then I see "Your password is too short! Try a longer password!"

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
    And I type my password
    And I confirm my password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-phone-success"
    And I mock 'Amplify.Auth.currentAuthenticatedUser' with fixture "Auth.currentAuthenticatedUser-sms-mfa"
    Then I click the "Change Password" button
    Then I see "+17755551212"

  @angular @react @vue
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters wrong password requirements
    When I type my "username" with status "FORCE_CHANGE_PASSWORD"
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I should see the Force Change Password screen
    And I type an invalid wrong complexity new password
    And I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have upper case letters"
    Then I see "Password must have at least 8 characters"

  @angular @react @vue
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters password without lower case characters
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I should see the Force Change Password screen
    And I type an invalid no lower case new password
    And I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have lower case letters"
    Then I see "Password must have at least 8 characters"
    And I confirm "Password must have numbers" error is accessible

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
