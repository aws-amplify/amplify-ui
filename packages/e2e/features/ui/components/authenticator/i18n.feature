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
