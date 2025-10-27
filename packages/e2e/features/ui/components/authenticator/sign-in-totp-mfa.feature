Feature: Sign In with TOTP MFA

  If your backend has TOTP MFA required, Authenticator will redirect end users to
  TOTP confirmation screen when they try to sign in.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  @angular @react @vue @svelte
  Scenario: Sign in with valid credentials that have not set up TOTP MFA
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I will be redirected to the setup totp page
    Then I check to see if QR code is correct
    Then I see the "Confirm" button

  @angular @react @vue @svelte
  Scenario: Redirect to sign in page
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Back to Sign In" button
    Then I see "Sign in"

  @angular @react @vue @svelte
  Scenario: Invalid TOTP code
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign In" button
    Then I enter an invalid confirmation code
    Then I click the "Confirm" button
    Then I see 'Code mismatch'

  @angular @react @vue @svelte
  Scenario: Setup TOTP should only show one input code
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign In" button
    Then I see one code input

  @angular @react @vue @svelte
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist"

  # Tests the scenario where an admin creates a user with a temporary password
  # and the user is forced to setup a new password then setup TOTP as MFA type
  @angular @react @vue @svelte
  Scenario: Sign in with admin created user account, user must change password on first login and setup totp/mfa
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    When I type my "email" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Change Password"
    Then I type my password
    Then I confirm my password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with fixture "force-change-password-mfa-setup"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-mfa-setup-software-token"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.AssociateSoftwareToken" } }' with fixture "force-change-password-mfa-setup-associate-software-token"
    Then I click the "Change Password" button
    Then I confirm request '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }'
    Then I see "Setup TOTP"
