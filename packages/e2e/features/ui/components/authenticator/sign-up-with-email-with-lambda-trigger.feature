Feature: Sign Up with Email with Pre Sign Up Lambda Trigger for Auto Confirmation

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.
  Add a lambda pre-sign up trigger that auto confirms user.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email-lambda"

  @angular @react @vue @svelte
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    Then I don't see "Username" as an input field
    Then I don't see "Phone Number" as an input field

  @angular @react @vue @svelte
  Scenario: Sign up with a new email & password with confirmed info
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email-with-lambda-trigger"
    Then I spy request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I click the "Create Account" button
    # Confirms signup is called
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }'
    # Confirms signIn begins
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I do not see the "Create Account" button


  @angular @react @vue @svelte
  Scenario: Sign up with an email & password and verify it was called correctly
    When I type a new "email" with value 'TEST@example.com'
    Then I type my password
    Then I confirm my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email-with-lambda-trigger"
    Then I spy request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I click the "Create Account" button
    # Confirms signup is called
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }'
    # Confirms auto signIn begins
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I do not see the "Create Account" button
