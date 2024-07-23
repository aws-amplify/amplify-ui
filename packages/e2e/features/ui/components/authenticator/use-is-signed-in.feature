Feature: UseIsSignedIn Hook

  The UseIsSignedIn Hook uses hub events from Amplify JS that provides a method 
  of conditionally rendering an authentication component.

  Background:
    Given I'm running the example "/ui/components/authenticator/use-is-signed-in"

    @angular @react @vue @react-native
    Scenario: Sign in with confirmed credentials and then sign out
        When I type my "email" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Sign out"
        Then I click the "Sign out" button
        Then I see "Sign in"