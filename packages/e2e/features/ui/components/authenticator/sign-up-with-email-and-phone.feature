Feature: Sign Up with Email & Phone Number 

  Amplify CLI supports `email` and `phone_number` as a login mechanism. In this scenario, the Sign Up screen allows end-users to toggle which to login with.  

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email-and-phone"

  @todo-angular @react @todo-vue
  Scenario: Login with Email
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I see "Login with"
    And I see "Email" as an input field
    And I click the "Email" button
    And I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Confirmation Code"

  @todo-angular @react @todo-vue
  Scenario: Email field autocompletes username

    On sign up form, autocomplete prefers usage of username instead of phone number. 
    See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    Then "Email" field autocompletes "username"

  @todo-angular @react @todo-vue
  Scenario: Login with Phone number
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-phone"
    When I see "Login with"
    And I click the "Phone Number" button
    And I see "Phone Number" as an input field
    And I select my country code with status "UNCONFIRMED"
    And I type my "phone number" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I type my "email" with status "UNCONFIRMED"
    And I click the "Create Account" button
    Then I see "Confirmation Code"

  @todo-angular @react @todo-vue
  Scenario: Phone Number field autocompletes username

    On sign up form, autocomplete prefers usage of username instead of phone number. 
    See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    When I click the "Phone Number" button
    Then "Phone Number" field autocompletes "username"
