Feature: Sign In with Force New Password flow

  Amplify's SignIn component will redirect end users to force-new-password 
  screen if their account is on "FORCE_CHANGE_PASSWORD" state.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"

  @todo-migration @angular @react @vue 
  Scenario: Back to Sign In works in the FORCE_CHANGE_PASSWORD state
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    Then I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I should see the Force Change Password screen
    Then I click the "Back to Sign In" button
    Then I see "Sign In"

  @todo-migration @angular @react @vue 
  Scenario: Sign in using a valid phone number and password and user is in a FORCE_CHANGE_PASSWORD state
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    Then I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I should see the Force Change Password screen
    Then I type my password
    Then I confirm my password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-phone-success"
    Then I mock 'Amplify.Auth.currentAuthenticatedUser' with fixture "Auth.currentAuthenticatedUser-sms-mfa"
    Then I click the "Change Password" button
    Then I see "+17755551212"

  @todo-migration @angular @react @vue
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters wrong password requirements
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    Then I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I should see the Force Change Password screen
    Then I type an invalid wrong complexity password
    Then I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have upper case letters"
    Then I see "Password must have at least 8 characters"

  @todo-migration @angular @react @vue
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters password without lower case characters
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    Then I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I should see the Force Change Password screen
    Then I type an invalid no lower case password
    Then I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have lower case letters"
    Then I see "Password must have at least 8 characters"
    Then I confirm "Password must have numbers" error is accessible in password field

  @todo-migration @angular @react @vue 
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters an invalid new password
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    Then I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I should see the Force Change Password screen
    Then I type an invalid password
    Then I confirm my password
    Then I click the "Change Password" button
    Then I see "Your passwords must match"
