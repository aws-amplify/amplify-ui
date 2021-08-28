Feature: Sign In with Confirmed and Verified Credentials

  Signing in with confirmed and verified credentials is the standard
  authentication experience when using the Amplify Authenticator. Users
  will be directed to your application upon successfully signing in with
  their confirmed and verified credentials.

  The following examples demonstrate this experience across multiple
  environments configured with varying authentication aliases.

  @angular @next @vue
  Scenario Outline: Sign In with <loginMechanism>
    Given I'm using the example <example>
    When I type my <loginMechanism> with status "CONFIRMED"
    And I type my password
    And I click the Sign in button
    Then I see "Sign out"

    Scenarios:
      | loginMechanism | example              |
      | "username"     | "auth-with-username" |
      | "email"        | "auth-with-email"    |
      | "phone number" | "auth-with-phone"    |

  @angular @next @vue
  Scenario Outline: Sign In with multi alias: <loginMechanism>
    Given I'm using the example "auth-with-multi-alias"
    When I type my <loginMechanism> with status "CONFIRMED"
    And I type my password
    And I click the Sign in button
    Then I see "Sign out"

    Scenarios:
      | loginMechanism |
      | "username"     |
      | "email"        |
      | "phone number" |

  @next
  Scenario: Sign in using "withAuthenticator" higher order component
    Given I'm using the example "withAuthenticator"
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the Sign in button
    Then I see "Sign out"
