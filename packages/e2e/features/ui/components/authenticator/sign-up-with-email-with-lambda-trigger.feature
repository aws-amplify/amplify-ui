Feature: Sign Up with Email with Pre Sign Up Lambda Trigger for Auto Confirmation

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.
  Add a lambda pre-sign up trigger that auto confirms user.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email-lambda"

  @angular @react @vue
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

  @angular @react @vue  
  Scenario: Sign up with a new email & password with confirmed info
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email-with-lambda-trigger"
    And I click the "Create Account" button
    And I mock "autoSignIn" event with fixture "sign-up-with-email-with-lambda-trigger"
    Then I see "Sign out"


  @angular @react @vue  
  Scenario: Sign up with an email & password and verify it was called correctly
    When I type a new "email" with value 'TEST@example.com'
    And I type my password
    And I confirm my password
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email-with-lambda-trigger"
    And I click the "Create Account" button
    And I mock "autoSignIn" event with fixture "sign-up-with-email-with-lambda-trigger"
    And I see "TEST@example.com"
    And I see "Sign out"
