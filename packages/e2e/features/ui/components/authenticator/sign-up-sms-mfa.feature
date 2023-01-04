Feature: Sign up with SMS MFA

  If your backend has SMS MFA required, Authenticator will redirect end users to 
  SMS confirmation screen when they successfully sign up.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-phone"
    When I click the "Create Account" tab 

  @angular @react @vue
  Scenario: Successful sign up redirects user to sms mfa route
    When I select my country code with status "UNCONFIRMED"
    And I type my "phone number" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I type my "email" with status "UNCONFIRMED"
    And I click the "Create Account" button
    Then I see "Confirmation Code"
    And I type a valid confirmation code
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    And I mock 'Amplify.Auth.currentAuthenticatedUser' with fixture "Auth.currentAuthenticatedUser-verified-email"
    And I click the "Confirm" button
    And I mock "autoSignIn" event with fixture "Auth.signIn-sms-mfa"
    Then I see "Confirm SMS Code"
    
