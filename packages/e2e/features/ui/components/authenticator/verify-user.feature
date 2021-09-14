Feature: Verify User

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-email"

  @angular @react @vue
  Scenario: Redirect to "Verify" page
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the verify user page

  @angular @react @vue
  Scenario: Skip verify account
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Skip" button
    Then I see "Sign out"

  # Confirm verify test skipped due to SES limits
  Scenario: Redirect to "Confirm Verify" page
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    And I click on the first radio button
    And I click the "Verify" button
    Then I will be redirected to the confirm verify user page
