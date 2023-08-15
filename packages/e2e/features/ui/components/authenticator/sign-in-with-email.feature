Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"

  @angular @react @vue
  Scenario: Sign in with force password reset calls forgot password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with error fixture "force-reset-password"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Given I spy "Amplify.Auth.forgotPassword" method
    Then I click the "Sign in" button
    Then I see "Code *"
    Then "Amplify.Auth.forgotPassword" method is called

  @angular @react @vue @react-native
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist."

  @angular @react @vue
  Scenario: Sign in with unconfirmed credentials

  If you sign in with an unconfirmed account, Authenticator will redirect you to `confirmSignUp` route.

    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I type my "email" with status "UNCONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Confirmation Code"
    Then I type a valid confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    # Mocking these two calls is much easier than intercepting 6+ network calls with tokens that are validated & expire within the hour
    Then I mock 'Amplify.Auth.signIn' with fixture "Auth.signIn-verified-email"
    Then I mock 'Amplify.Auth.currentAuthenticatedUser' with fixture "Auth.currentAuthenticatedUser-verified-email"
    Then I click the "Confirm" button
    Then I see "Sign out"

  @angular @react @vue @react-native
  Scenario: Sign in with confirmed credentials
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button

  @angular @react @vue @react-native
  Scenario: Sign in with confirmed credentials then sign out
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"

  @angular @react @vue
  Scenario: Sign Up Tab Is Not Present 
    Then I see "Sign in"
    Then I don't see "Create Account"

  @angular @react @vue
  Scenario: Email field autocompletes username

  On sign in form, autocomplete prefers usage of username instead of email. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/.

    Then "Email" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "current-password"
    Then "Password" field autocompletes "current-password"
