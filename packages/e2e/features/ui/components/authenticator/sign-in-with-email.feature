Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"

  @skip @angular @react @vue
  Scenario: Sign in with force password reset calls forgot password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with error fixture "force-reset-password"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Given I spy "Auth.forgotPassword" method
    Then I click the "Sign in" button
    Then I see "Code *"
    Then "Auth.forgotPassword" method is called

  @angular @react @vue @react-native
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist."

  @angular @react @vue
  Scenario: Sign in with unconfirmed credentials

  If you sign in with an unconfirmed account, Authenticator will redirect you to `confirmSignUp` route.

    When I type my "email" with status "UNCONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I spy request '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I see "Confirmation Code"
    Then I type a valid confirmation code
    Then I spy request '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }'
    Then I click the "Confirm" button
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }'

  @angular @react @vue @react-native
  Scenario: Sign in with confirmed credentials
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"

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
