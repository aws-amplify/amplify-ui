Feature: Sign In with SMS MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"

  @angular @react @vue
  Scenario: Sign in using a valid phone number and SMS MFA
    When I select my country code with status "CONFIRMED"
    And I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the confirm sms mfa page

  @angular @react @vue
  Scenario: Redirect to sign in page
    When I select my country code with status "CONFIRMED"
    And I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Back to Sign In" button
    Then I see "Sign in"

  @angular @react @vue
  Scenario: Incorrect SMS code
    When I select my country code with status "CONFIRMED"
    And I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    And I type an invalid SMS code
    And I click the "Confirm" button
    Then I see "Invalid code or auth state for the user."
    
  @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I select my country code with status "UNKNOWN"
    And I type my "phone number" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"
