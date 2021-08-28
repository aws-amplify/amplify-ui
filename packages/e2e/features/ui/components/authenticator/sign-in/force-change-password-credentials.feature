Feature: Sign In with Force Change Password Credentials

  Users who are created by an administrator are provided a temporary
  password. When a user signs in using the temporary password, they
  are redirected to a screen asking them to change their password.

  The following examples demonstrate this experience across multiple
  environments configured with varying authentication aliases.

  @angular @next @vue
  Scenario: Sign in with email
    Given I'm using the example "auth-with-email"
    When I type my "email" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the Sign in button
    Then I see "Change Password"
