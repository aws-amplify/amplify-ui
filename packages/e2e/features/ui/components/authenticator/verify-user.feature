Feature: Verify User

  If end user tries to sign in with unverified account, Authenticator will
  redirect them to account verification screen.

  Note: tests are skipped for React Native, need separate app for verify-user so we don't mock sign-in
   
  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUserAttributeVerificationCode" } }' with fixture "verify-user-email"

  @angular @react @vue
  Scenario: Redirect to "Confirm Verify" page and replace label and placeholder
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Email" radio button
    And I click the "Verify" button
    Then 'New Label' field does not have "required"
    Then I see "New Label"
    Then "New Label" field does not have class "amplify-visually-hidden"
    Then I see placeholder "Enter your Confirmation Code:"

  @todo-react-native
  Scenario: Redirect to "Confirm Verify" page and replace label
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Email" radio button
    And I click the "Verify" button
    Then I see "New Label"
    And I click the "Skip" button
    And I click the "Sign out" button

  @angular @react @vue @todo-react-native
  Scenario: Redirect to "Verify" page and verify custom header and footer text
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Enter Information:"
    Then I see "Footer Information"
    And I click the "Skip" button
    And I click the "Sign out" button

  @angular @react @vue @todo-react-native
  Scenario: Skip verify account
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Skip" button
    Then I see "Sign out"
    And I click the "Sign out" button

  @todo-angular @todo-react @todo-vue @todo-react-native
  Scenario: Redirect to "Confirm Verify" page and verify custom header and footer 
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Email" radio button
    And I click the "Verify" button
    Then I see "Enter Information:"
    Then I see "Footer Information"
    And I click the "Skip" button
    And I click the "Sign out" button
    