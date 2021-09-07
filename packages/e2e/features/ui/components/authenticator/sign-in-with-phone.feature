Feature: Sign In with Phone Number

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their phone
  number when signing into your application.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"

  @vue @react @angular
  Scenario: Sign in with unknown credentials
    When I type my "phone_number" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  @vue @react @angular
  Scenario: Sign in with unconfirmed credentials
    When I type my "phone_number" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Confirmation Code"


  @vue @react @angular
  Scenario: Sign in with confirmed credentials
    When I type my "phone_number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  @react @skip
  Scenario: Sign in with force change password credentials
    When I type my "phone_number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"
