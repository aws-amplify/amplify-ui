Feature: Sign In with Multiple Aliases

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their username,
  email, or phone number when signing into your application.

  Background:
    Given I'm at the sign in page

  @react
  Scenario: Multiple login mechanisms
    Then I see "Username or Email or Phone Number"

  @react
  Scenario: Sign in with confirmed username
    When I type the valid login mechanism "CONFIRMED_USERNAME"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign Out"

  @react
  Scenario: Sign in with confirmed email
    When I type the valid login mechanism "CONFIRMED_EMAIL"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign Out"

  @react
  Scenario: Sign in with confirmed phone number
    When I type the valid login mechanism "CONFIRMED_PHONE_NUMBER"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign Out"
