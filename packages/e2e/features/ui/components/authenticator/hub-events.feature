Feature: Hub Events
  Authenticator listens to external Auth Hub events from 'aws-amplify'. For 
  example, Authenticator will automatically sign out the user if it gets a
  "signOut" hub event.

  Background:
    Given I'm running the example "/ui/components/authenticator/hub-events"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials then sign out
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see "Sign in"

