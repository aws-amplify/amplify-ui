Feature: Sign In with Force New Password flow

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"

  @React @skip
  Scenario: Sign in using a valid phone number and password and user is in a FORCE_CHANGE_PASSWORD state
		And I type in the phone number "FORCE_CHANGE_PHONE_NUMBER"
		And I type in the password "VALID_PASSWORD"
		And I click the "Sign In" button
		Then I should see the Force Change Password screen

  @React @skip
  Scenario: User is in a FORCE_CHANGE_PASSWORD state and then enters an invalid new password
		And I type in the phone number "FORCE_CHANGE_PHONE_NUMBER"
		And I type in the password "VALID_PASSWORD"
		And I click the "Sign In" button
		Then I should see the Force Change Password screen
    And I type in the password "INVALID_NEW_PASSWORD"
    And I click the "Change password" button
    Then I should see error text
