Feature: Verify User

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-federated"

  @next @react @vue @skip
  Scenario: Verify User with valid but unverified email
    When I type a valid but unverified email "UNVERIFIED_EMAIL"
    And I type a valid password "VALID_PASSWORD"
    And I click the "Sign in" button
    Then I will be redirected to the verify user page
    And I click on the first radio button
    And I click the "Verify" button
    Then I will be redirected to the confirm verify user page
