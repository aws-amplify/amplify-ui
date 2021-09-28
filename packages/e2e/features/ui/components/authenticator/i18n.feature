Feature: Internationalization (I18n)

  The `Authenticator` contains translations using `I18n`.

  Background:
    Given I'm running the example "ui/components/authenticator/i18n"

  @angular @react @vue
  Scenario: Authenticator reflects `I18n.setLanguage('ja')`
    When I click the "Create Account" tab in "ja"
    Then the "Create a new account" header is in "ja"
    And the "Email" input is in "ja"
    And the "Password" input is in "ja"
    And the "Confirm Password" input is in "ja"
    And the "Create Account" button is in "ja"
