Feature: Sign In with Force New Password flow

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"

  @angular @react @vue @skip
  Scenario: Sign in using a valid phone number and password and user is in a FORCE_CHANGE_PASSWORD state
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
		Then I should see the Force Change Password screen

  @angular @react @vue @skip
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters an invalid new password
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    And I type an invalid password
    And I confirm the invalid password
    And I click the "Change Password" button
    Then I should see error text
