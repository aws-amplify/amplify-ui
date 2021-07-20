@skip
Feature: Sign In with Username

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use a customized
  username when signing into your application.

  Background:
    Given I'm at the sign in page

  @Vue
  @React
  Scenario: Sign in with unknown credentials
    When I type the valid username "UNKNOWN_USERNAME"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"

  @React
  Scenario: Sign in with unconfirmed credentials
    When I type the valid username "UNCONFIRMED_USERNAME"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Confirmation Code"

  @Vue
  @React
  Scenario: Sign in with confirmed credentials
    When I type the valid username "CONFIRMED_USERNAME"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign out"

  @React @skip
  Scenario: Sign in with force change password credentials
    When I type the valid username "FORCE_CHANGE_USERNAME"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Change Password"
