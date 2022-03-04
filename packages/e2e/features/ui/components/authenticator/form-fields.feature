Feature: Form Fields

  You are able to customize the order and the contents of form fields on your Authenticator 
  through `formFields` prop.

  Please see https://ui.docs.amplify.aws/components/authenticator#form-field-customization
  for more details.

  Background:
    Given I'm running the example "ui/components/authenticator/custom-slots"

  @angular @react @vue
  Scenario: Order of sign up inputs are backwards
    When I click the "Create Account" tab 
    Then I see "Confirm Password" as the "0" input
    Then I see "Enter your Password:" as the "1" input
    Then I see "Email" as the "2" input

  @angular @react @vue
  Scenario: Sign in with replaced email placeholder 
    Then I see placeholder "Enter your email"

  @angular @react @vue
  Scenario: Sign in label is visibile 
    When I see "Email"
    Then "Email" field does not have class "amplify-visually-hidden"

  @angular @react @vue
  Scenario: Sign up with replaced password label 
    When I click the "Create Account" tab 
    Then I see "Password:"

  @angular @react @vue
  Scenario: Sign up with replaced password placeholder 
    When I click the "Create Account" tab 
    Then I see placeholder "Enter your Password:"

  @angular @react @vue
  Scenario: Sign up with not required password 
    When I click the "Create Account" tab 
    Then 'Password:' field does not have "required"

  @angular @react @vue
  Scenario: Sign up with replaced confirm password placeholder and is visible 
    When I click the "Create Account" tab 
    Then I see "Confirm Password:"
    Then "Confirm Password:" field does not have class "amplify-visually-hidden"

  @angular @react @vue
  Scenario: Confirm Force New Password replaced placeholder and label is visible
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    And I type my "email" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then "Password" field does not have class "amplify-visually-hidden"
    Then I see placeholder "Enter your Password:"

  Scenario: Reset password replaced placeholder and label is visible
    When I click the "Reset Password" button
    Then "Enter your email" field does not have class "amplify-visually-hidden"
    Then I see placeholder "Enter your email:"

  @angular @react @vue
  Scenario: Confirm Reset Password replaced placeholder, label and label is visible
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "verify-user-email"
    When I click the "Reset Password" button
    Then I type my "email" with status "UNVERIFIED"
    And I click the "Send Code" button
    Then I see "New Label"
    Then I see placeholder "Enter your Password Please:"
    Then "New Label" field does not have class "amplify-visually-hidden"
    Then 'New Label' field does not have "required"
    Then I see placeholder "Enter your Confirmation Code:"

  @angular @react @vue
  Scenario: Setup TOTP Sign in replace placeholder, and label
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then 'New Label' field does not have "required"
    Then I see "New Label"
    Then "New Label" field does not have class "amplify-visually-hidden"
    Then I see placeholder "Enter your Confirmation Code:"

  @angular @react @vue
  Scenario: Confirm sign in and replace placeholder, and label
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    Then 'New Label' field does not have "required"
    Then I see "New Label"
    Then "New Label" field does not have class "amplify-visually-hidden"
    Then I see placeholder "Enter your Confirmation Code:"   
