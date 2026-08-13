Feature: Internationalization (I18n)

  The `Authenticator` contains translations using `I18n`.

  Background:
    Given I'm running the example "ui/components/authenticator/i18n"

  @angular @react @vue @svelte
  Scenario: Authenticator reflects `I18n.setLanguage('ja')`
    Then the "Email" input is in "ja"
    Then the "Password" input is in "ja"
    Then the "Confirm Password" input is in "ja"
    Then the "Create Account" button is in "ja"


  @angular @react @vue @svelte
  Scenario: Show custom error message when signing in
    When I click "Sign In Custom"
    Then the "Username" input is in "ja" and I type the wrong username or password
    Then the "Password" input is in "ja" and I type the wrong username or password
    Then the "Sign in" button is in "ja" and I click it
    Then I see "Error with your user"

  @angular @react @vue @svelte
  Scenario: Authenticator reflects updated vocabularies for `I18n.setLanguage('ja')`
    Then I see "Sign In Custom"

  # Regression test for #6966: delivery-message punctuation is owned by the
  # translation, so a non-Latin locale (Japanese) renders its own terminal
  # punctuation (the ideographic full stop 。) after the destination and at the
  # end of the message, never a hardcoded ASCII period.
  @angular @react @vue @svelte
  Scenario: Confirm sign up delivery message uses locale punctuation, not a hardcoded ASCII period
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I type "e2e-user" in the "Username" input in "ja"
    Then I type "e2e-user@example.com" in the "Email" input in "ja"
    Then I type "TestPassword123!" in the "Password" input in "ja"
    Then I type "TestPassword123!" in the "Confirm Password" input in "ja"
    Then the "Create Account" button is in "ja" and I click it
    Then I see "送信先: a***@e***.com。"
    Then I see "到着するまでに 1 分かかることがあります。"
    Then I don't see "a***@e***.com."
