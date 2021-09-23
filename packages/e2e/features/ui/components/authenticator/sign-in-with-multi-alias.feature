Feature: Sign In with Multiple Aliases

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their username,
  email, or phone number when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/auth-with-multi-alias"

  @angular @react @vue
  Scenario: Multiple login mechanisms
    Then I see "Username or Email or Phone Number"

  @angular @react @vue
  Scenario: Sign in with confirmed username
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign Out"

  @angular @react @vue
  Scenario: Sign in with confirmed email
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign Out"

  @angular @react @vue
  Scenario: Sign in with confirmed phone number
    When I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign Out"

