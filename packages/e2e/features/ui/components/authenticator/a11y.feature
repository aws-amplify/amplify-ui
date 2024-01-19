Feature: A11y

  Test Authenticator a11y

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"
    Given I am testing a11y

  @angular @react @vue @a11y
  Scenario: The authenticator loads
    Then I check the page for a11y issues
