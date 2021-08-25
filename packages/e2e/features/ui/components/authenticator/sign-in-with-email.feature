Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  when signing into your application.

  Background:
    Given I'm at the sign in page


  @vue @react @angular
  Scenario: Sign in with unknown credentials
    When I type the valid email "UNKNOWN_EMAIL"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"

  @vue @react @angular
  Scenario: Sign in with unconfirmed credentials
    When I type the valid email "UNCONFIRMED_EMAIL"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Confirmation Code"

  @vue @react @angular
  Scenario: Sign in with confirmed credentials
    When I type the valid email "CONFIRMED_EMAIL"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign out"

  @react @skip
  Scenario: Sign in with force change password credentials
    When I type the valid email "FORCE_CHANGE_EMAIL"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Change Password"
