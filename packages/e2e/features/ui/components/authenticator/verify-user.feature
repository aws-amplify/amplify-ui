Feature: Verify User

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-federated"

  # Veriy tests skipped due to SES limits
  Scenario: Verify User with valid but unverified email
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the verify user page
    When I click on the first radio button
    And I click the "Verify" button
    Then I will be redirected to the confirm verify user page
