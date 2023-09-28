Feature: Sign In with SMS MFA

  If your backend has SMS MFA required, Authenticator will redirect end users to 
  SMS confirmation screen when they try to sign in.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"

  @todo-migration @angular @react @vue
  Scenario: Sign in with with sms mfa and check mocked name attribute
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Confirm SMS Code"
    Then I type a valid SMS confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "confirm-sign-in-sms-mfa"
    Then I mock 'Amplify.Auth.currentAuthenticatedUser' with fixture "Auth.currentAuthenticatedUser-sms-mfa"
    Then I click the "Confirm" button
    Then I see "testName"


  @todo-migration @angular @react @vue
  Scenario: Sign in using a valid phone number and SMS MFA
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I will be redirected to the confirm sms mfa page


  @todo-migration @angular @react @vue
  Scenario: Redirect to sign in page
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Back to Sign In" button
    Then I see "Sign in"

  @todo-migration @angular @react @vue
  Scenario: Incorrect SMS code with translated text
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I type an invalid SMS code
    Then I click the "Confirm" button
    Then I see "translated text"
    
  @todo-migration @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I select my country code with status "UNKNOWN"
    Then I type my "phone number" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist"

@todo-migration @angular @react @vue
Scenario: Sign in with force change password with sms mfa
  Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
  When I select my country code with status "FORCE_CHANGE_PASSWORD"
  Then I type my "phone number" with status "CONFIRMED"
  Then I type my password
  Then I click the "Sign in" button
  Then I see "Change Password"
  Then I type my password
  Then I confirm my password
  Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-sms-mfa"
  Then I click the "Change Password" button
  Then I see "Confirm SMS Code"
