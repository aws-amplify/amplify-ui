Feature: Sign In with Unknown Credentials

  Signing in with unknown credentials will present the user with
  a simple message that the credentials are unknown.

  The following examples demonstrate this experience across multiple
  environments configured with varying authentication aliases.

  @angular @next @vue
  Scenario Outline: Sign In with <loginMechanism>
    Given I'm using the example <example>
    When I type my <loginMechanism> with status "UNKNOWN"
    And I type my password
    And I click the Sign in button
    Then I see "User does not exist"

    Scenarios:
      | loginMechanism | example              |
      | "username"     | "auth-with-username" |
      | "email"        | "auth-with-email"    |
      | "phone number" | "auth-with-phone"    |

  @angular @next @vue
  Scenario Outline: Sign In with multi alias: <loginMechanism>
    Given I'm using the example "auth-with-multi-alias"
    When I type my <loginMechanism> with status "UNKNOWN"
    And I type my password
    And I click the Sign in button
    Then I see "User does not exist"

    Scenarios:
      | loginMechanism |
      | "username"     |
      | "email"        |
      | "phone number" |

  @next
  Scenario: Sign in using "withAuthenticator" higher order component
    Given I'm using the example "withAuthenticator"
    When I type my "username" with status "UNKNOWN"
    And I type my password
    And I click the Sign in button
    Then I see "User does not exist"
