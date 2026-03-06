Feature: Sign In with SMS MFA

  If your backend has SMS MFA required, Authenticator will redirect end users to
  SMS confirmation screen when they try to sign in.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"

  @angular @react @vue @svelte
  Scenario: Sign in with with sms mfa and check mocked name attribute
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I will be redirected to the confirm sms mfa page
    Then I see "Confirm SMS Code"
    Then I type a valid SMS confirmation code
    Then I spy request '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }'
    Then I click the "Confirm" button
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }'

  @angular @react @vue @svelte
  Scenario: Sign in and navigate back to sign in page
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Back to Sign In" button
    Then I see "Sign in"

  @angular @react @vue @svelte
  Scenario: Incorrect SMS code with translated text
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I type an invalid SMS code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with error fixture "code-mismatch-exception"
    Then I click the "Confirm" button
    Then I see "The verification code you entered is incorrect"

  @angular @react @vue @svelte
  Scenario: Sign in with unknown credentials
    When I update my country code from "+1" to "+20"
    Then I type my "phone number" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist"

  @angular @react @vue @svelte
  Scenario: Sign in with force change password with sms mfa
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    When I update my country code from "+1" to "+30"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Change Password"
    Then I type my password
    Then I confirm my password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-sms-mfa"
    Then I click the "Change Password" button
    Then I see "Confirm SMS Code"
