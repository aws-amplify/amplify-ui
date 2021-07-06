Feature: Sign In with SMS MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  @React
  Scenario: Sign in using a valid phone number and SMS MFA
    Given I'm at the sign in page
    When I type a valid phone number "VALID_PHONE_NUMBER"
    And I type a valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I will be redirected to the confirm sms mfa page
    
  @React
  Scenario: Sign in with invalid credentials
    Given I'm at the sign in page
    When I type an invalid username "INVALID_PHONE_NUMBER"
    And I type an invalid password "INVALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"