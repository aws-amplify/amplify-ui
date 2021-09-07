Feature: Sign Up with Federation

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-federated"
    When I click "Create account"

  @angular @next @react @vue
  Scenario: Sign up using OAUTH
		Then I see the "Google" sign in button
		And I see the "Facebook" sign in button
		And I see the "Amazon" sign in button
