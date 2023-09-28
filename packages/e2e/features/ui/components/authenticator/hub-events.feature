Feature: Hub Events
  Authenticator listens to external Auth Hub events from 'aws-amplify'. For 
  example, Authenticator will automatically sign out the user if it gets a
  "signOut" hub event.

  Background:
    Given I'm running the example "/ui/components/authenticator/hub-events"

  @todo-migration @angular @react @vue
  Scenario: Sign in with confirmed credentials then sign out
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"

  @todo-migration @angular @react @vue
  Scenario: Unsuccessful token refresh logs out the user
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    When I mock "tokenRefresh_failure" event
    Then I see "Sign in"

  @todo-migration @angular @react @vue
  Scenario: autoSignIn signs in the user after sign up
    When I click the "Create Account" tab 
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    Then I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "Confirmation Code"
    Then I type a valid confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    Then I click the "Confirm" button
    Then I mock "autoSignIn" event with fixture "Auth.currentAuthenticatedUser-verified-email"
    Then I see "Sign out"
    
  @todo-migration @angular @react @vue
  Scenario: Successful token refresh calls currentAuthenticatedUser
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Given I spy "Amplify.Auth.currentAuthenticatedUser" method
    When I mock "tokenRefresh" event
    Then "Amplify.Auth.currentAuthenticatedUser" method is called
