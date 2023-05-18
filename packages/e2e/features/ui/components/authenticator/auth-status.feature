Feature: Verify Auth Status on Sign In and Sign Out

  Background:
    Given I'm running the example "/ui/components/authenticator/auth-status"

  @angular @react
  Scenario: Sign in with confirmed credentials, reload, sign out, and reload
    Then I see "unauthenticated" 
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign In" button
    Then I see "authenticated"
    Then I see "Sign out"
    When I reload the page
    Then I see "authenticated"
    Then I see "Sign Out"
    And I click the "Sign Out" button
    Then I see "unauthenticated"
    When I reload the page
    Then I see "unauthenticated"
