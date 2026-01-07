Feature: Sign In with Username

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use a customized
  username when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-username"

  @angular @react @vue @svelte @react-native
  Scenario: Sign in with unknown credentials
    When I type my "username" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist."

  @angular @react @vue @svelte
  Scenario: Verify Submit text is correct on confirm Reset Password Page without translation
    Then I click the "Forgot your Password?" button
    When I type my "username" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    Then I see "Code"
    Then I type a valid code
    Then I type my new password
    Then I confirm my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' with fixture "confirm-reset-password"
    Then I see "Submit"

  @angular @react @vue @svelte @react-native
  Scenario: Sign in with unconfirmed credentials
    When I type my "username" with status "UNCONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with error fixture "user-not-confirmed-exception"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ResendConfirmationCode" } }' with fixture "resend-confirmation-code-email"
    Then I see "Confirmation Code"

  @angular @react @vue @svelte @react-native
  Scenario: Sign in with confirmed credentials
    When I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    When I reload the page
    Then I see "Sign out"
    Then I click the "Sign out" button

  @angular @react @vue @svelte
  Scenario: Sign in with confirmed credentials, reload, sign out, then sign in again
    When I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    When I reload the page
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"
    Then I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"

  @angular @react @vue @svelte @react-native
  Scenario: Sign in with confirmed credentials, sign out, then sign in again
    When I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"
    Then I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button

  # FORCE_CHANGE_PASSWORD tests are skipped as the temporary passwords used for these
  # test accounts will expire in Cognito.
  # @angular @react @vue @svelte
  Scenario: Sign in with force change password credentials
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    When I type my "username" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Change Password"

  @angular @react @vue @svelte
  Scenario: Sign in with untrimmed username
    When I type my username with untrimmed spaces
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"

  @angular @react @vue @svelte
  Scenario: Username field autocompletes username
    Then "Username" field autocompletes "username"

  @angular @react @vue @svelte
  Scenario: Password fields autocomplete "current-password"
    Then "Password" field autocompletes "current-password"
