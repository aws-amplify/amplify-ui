Feature: Sign Up with Phone 

  Create a new user in the Amazon Cognito UserPool by passing the new user’s phone number and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-phone/"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-phone"

  @angular @react @vue @react-native
  Scenario: Login mechanism set to "phone_number"
    Then I see "Phone Number" as an input field
    Then I don't see "Username" as an input field

  @angular @react @vue @react-native
  Scenario: "Email" is included from `aws_cognito_verification_mechanisms`
    Then I see "Email" as an "email" field

  @angular @react @vue @react-native
  Scenario: Sign up with valid phone number & password
    Then I type my "phone number" with status "UNCONFIRMED"
    Then I type my password
    Then I confirm my password
    Then I type my "email" with status "UNCONFIRMED"
    Then I click the "Create Account" button
    Then I see "Confirmation Code"

  @angular @react @vue
  Scenario: Phone number field autocompletes username

  On sign up form, autocomplete prefers usage of username instead of phone number. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/.

    Then "Phone Number" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "new-password"
    Then "Password" field autocompletes "new-password"
    Then "Confirm Password" field autocompletes "new-password"
    