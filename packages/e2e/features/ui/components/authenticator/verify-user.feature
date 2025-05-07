Feature: Verify User

  If end user tries to sign in with unverified account, Authenticator will
  redirect them to account verification screen.

  Note: tests are skipped for React Native, need separate app for verify-user so we don't mock sign-in

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser" } }' with fixture "fetch-user-attributes-unverified-email"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUserAttributeVerificationCode" } }' with fixture "user-attribute-verification-code"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.VerifyUserAttribute" } }' with fixture "confirm-user-attribute"

  @angular @react @vue
  Scenario: Redirect to "Confirm Verify" page and replace label and placeholder
    When I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Email" radio button
    Then I click the "Verify" button
    Then 'New Label' field does not have "required"
    Then I see "New Label"
    Then "New Label" field does not have class "amplify-visually-hidden"
    Then I see placeholder "Enter your Confirmation Code:"
    Then I type a valid confirmation code for attribute confirmation
    Then I click the "Submit" button
    Then I see "Sign out"

  @angular @react @vue @todo-react-native
  Scenario: Redirect to "Verify" page and verify custom header and footer text
    When I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Enter Information:"
    Then I see "Footer Information"
    Then I click the "Skip" button
    Then I click the "Sign out" button

  @angular @react @vue @todo-react-native
  Scenario: Skip verify account
    When I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Skip" button
    Then I see "Sign out"
    Then I click the "Sign out" button

  @angular @react @vue
  Scenario: No verify account when nothing to verify
    When I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser" } }' with fixture "fetch-user-attributes-none"
    Then I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button

  @angular @react @vue @todo-react-native
  Scenario: Redirect to "Confirm Verify" page and verify custom header and footer
    When I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Email" radio button
    Then I click the "Verify" button
    Then I see "Enter Information:"
    Then I see "Footer Information"
    Then I click the "Skip" button
    Then I click the "Sign out" button

  @angular @react @vue
  Scenario: Redirect to "Verify" page and verify radio button is automatically selected
    When I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see the "Email" radio button checked
