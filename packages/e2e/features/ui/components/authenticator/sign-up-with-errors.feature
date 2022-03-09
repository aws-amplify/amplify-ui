Feature: Sign Up with Errors

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"

@angular @react @vue  
Scenario: Sign up with a new email & password with wrong password requirements
  When I type a new "email"
  And I type an invalid wrong complexity password
  And I confirm my password
  Then I see "Password must have numbers"
  Then I see "Password must have special characters"
  Then I see "Password must have upper case letters"
  Then I see "Password must have at least 8 characters"

Scenario: Sign up with a new email & password without lower case characters
  When I type a new "email"
  And I type an invalid no lower case password
  And I confirm my password
  Then I see "Password must have numbers"
  Then I see "Password must have special characters"
  Then I see "Password must have lower case letters"
  Then I see "Password must have at least 8 characters"
