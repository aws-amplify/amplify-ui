Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  or phone number when signing into your application.

  Background:
    Given I'm at the sign in page

  @React
  Scenario: Multiple login mechanisms
    Then I see "Email or Phone Number"

  @React
  Scenario: Sign in with confirmed email
    When I type the valid login mechanism "CONFIRMED_EMAIL"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign Out"

  @React
  Scenario: Sign in with confirmed phone number
    When I type the valid login mechanism "CONFIRMED_PHONE_NUMBER"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign Out"
