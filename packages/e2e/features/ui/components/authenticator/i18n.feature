Feature: Internationalization (I18n)

  The `Authenticator` contains translations using `I18n`.

  Background:
    Given I'm running the example "ui/components/authenticator/i18n"

  @angular @react @vue
  Scenario: Authenticator reflects `I18n.setLanguage('ja')`
    And the "Email" input is in "ja"
    And the "Password" input is in "ja"
    And the "Confirm Password" input is in "ja"
    And the "Create Account" button is in "ja"


  @angular @react @vue
  Scenario: Show custom error message when signing in
    When I click "Sign In Custom"
    And the "Username" input is in "ja" and I type the wrong username or password 
    And the "Password" input is in "ja" and I type the wrong username or password
    And the "Sign in" button is in "ja" and I click it
    Then I see "Error with your user"

  @angular @react @vue
  Scenario: Authenticator reflects updated vocabularies for `I18n.setLanguage('ja')`
    Then I see "Sign In Custom"
