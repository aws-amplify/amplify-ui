Feature: Sign up with SMS MFA

  If your backend has SMS MFA required, Authenticator will redirect end users to 
  SMS confirmation screen when they successfully sign up.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-phone"
    When I click the "Create Account" tab 

  @angular @react @vue
  Scenario: Successful sign up redirects user to sms mfa route
    Then I type my "phone number" with status "UNCONFIRMED"
    Then I type my password
    Then I confirm my password
    Then I type my "email" with status "UNCONFIRMED"
    Then I click the "Create Account" button
    Then I see "Confirmation Code"
    Then I type a valid confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    # error fixture in place to validate that `autoSignIn` is called, but `autoSignIn` will always fail
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with error fixture "limit-exceeded-exception"
    Then I click the "Confirm" button
    Then I see "Sign In"
    