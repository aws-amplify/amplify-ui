Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "/"


@angular @react @vue  
  Scenario: Sign up with a new email & password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I click the "Create Account" tab 
    Then I type a new "email"
    And I type my password
    And I confirm my password
    When I click the "Create Account" button
    Then I see "Confirmation Code"
