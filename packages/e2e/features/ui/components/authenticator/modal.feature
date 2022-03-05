Feature: Modal

  Modal variation overlays an application with the Authenticator.

  Background:
    Given I'm running the example "/ui/components/authenticator/withAuthenticator"

  @skip @angular @react @vue
  Scenario: Application is wrapped with Authenticator
    Then I see "Sign in"

  @skip @angular @react @vue
  Scenario: Application renders when signed in
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
