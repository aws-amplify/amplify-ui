Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"

  @angular @react @vue
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

  @angular @react @vue  
  Scenario: Sign up with a new email & password and lowercase the email 
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I type a new "email" with value "TEST@example.com"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I verify the body has "test@example.com" included
    Then I see "Confirmation Code"

@angular @react @vue  
Scenario: Sign up with a new email & password
  Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
  When I type a new "email"
  And I type my password
  And I confirm my password
  And I click the "Create Account" button
  Then I see "Confirmation Code"

  @angular @react @vue
  Scenario: Email field autocompletes username

  On sign up form, autocomplete prefers usage of username instead of email. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    And "Email" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "new-password"
    And "Password" field autocompletes "new-password"
    And "Confirm Password" field autocompletes "new-password"
    