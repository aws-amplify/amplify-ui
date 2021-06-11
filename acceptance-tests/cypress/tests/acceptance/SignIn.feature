Feature: SignIn

  Scenario: Sign in with invalid credentials
    Given I'm at the sign in page
    When I type an invalid email address "fake@email.com"
    And I type an invalid password "fakepassword"
    Then I see the error "Authentication error"
    And I don't see the application