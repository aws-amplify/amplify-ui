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

  @angular @react @vue
  Scenario: Unsuccessful token refresh logs out the user
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    When I mock "tokenRefresh_failure" event
    Then I see "Sign in"

  @angular @react @vue
  Scenario: autoSignIn signs in the user after sign up
    When I click the "Create Account" tab 
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    And I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I see "Confirmation Code"
    And I type a valid confirmation code
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    And I click the "Confirm" button
    And I mock "autoSignIn" event with fixture "Auth.currentAuthenticatedUser-verified-email"
    Then I see "Sign out"
    
  @angular @react @vue
  Scenario: Successful token refresh calls currentAuthenticatedUser
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    Given I spy "Amplify.Auth.currentAuthenticatedUser" method
    When I mock "tokenRefresh" event
    And "Amplify.Auth.currentAuthenticatedUser" method is called
