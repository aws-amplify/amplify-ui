Feature: Sign In with Federation

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-federated"

  @react @vue @angular
  Scenario: Sign in using OAUTH
		And I see the "Google" sign in button
		And I see the "Facebook" sign in button
		And I see the "Amazon" sign in button
