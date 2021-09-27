Feature: Translate with i18n

  You can use the I18n module to translate texts inside Authenticator.
  
  See: https://ui.docs.amplify.aws/ui/components/authenticator#<TODO>

  Background:
    Given I'm running the example "ui/components/authenticator/auth-with-translations"
  
  @angular @react @vue
  Scenario: Each field is translated into Japanese
    Then Sign In header is translated in Japanese
    And Email input is translated in Japanese
    And Password input is translated in Japanese
    And Forgot Password button is translated in Japanese
    And Create Account button is translated in Japanese
