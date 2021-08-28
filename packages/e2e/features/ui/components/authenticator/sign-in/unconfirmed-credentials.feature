Feature: Sign In with Unconfirmed Credentials

  Signing in with unconfirmed credentials will redirect users to
  a page prompting them for the confirmation code automatically
  sent to their email/phone number used upon account creation.

  The following examples demonstrate this experience across multiple
  environments configured with varying authentication aliases.

  @angular @next @vue
  Scenario Outline: Sign In with <loginMechanism>
    Given I'm using the example <example>
    When I type my <loginMechanism> with status "UNCONFIRMED"
    And I type my password
    And I click the Sign in button
    Then I see "Confirmation Code"

    Scenarios:
      | loginMechanism | example              |
      | "username"     | "auth-with-username" |
      | "email"        | "auth-with-email"    |
      | "phone number" | "auth-with-phone"    |

  @angular @next @vue
  Scenario Outline: Sign In with multi alias: <loginMechanism>
    Given I'm using the example "auth-with-multi-alias"
    When I type my <loginMechanism> with status "UNCONFIRMED"
    And I type my password
    And I click the Sign in button
    Then I see "Confirmation Code"

    Scenarios:
      | loginMechanism |
      | "username"     |
      | "email"        |
      | "phone number" |

  @next
  Scenario: Sign in using "withAuthenticator" higher order component
    Given I'm using the example "withAuthenticator"
    When I type my "username" with status "UNCONFIRMED"
    And I type my password
    And I click the Sign in button
    Then I see "Confirmation Code"
