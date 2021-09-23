Feature: Internationalization (I18n)

  The `Authenticator` contains translations using `I18n`.

  Background:
    Given I'm running the example "ui/components/authenticator/i18n"

  @angular @todo-angular @react @vue @todo-vue
  Scenario: Authenticator reflects `I18n.setLanguage('fr')`
    When I click the "Créer un compte" tab
    Then I see "Créer un nouveau compte"
