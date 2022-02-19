Feature: Default Phone Number Field

  WIP: Currently, you can set default region code through sign-up-form-fields slot. 
  Eventually, we will provide an explicit API for providing default region code across
  all forms.

  Background:
    Given I'm running the example "ui/components/authenticator/default-region-code"

  @angular @react @vue  
  Scenario: Sign up with a new email & password and lowercase the email 
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-phone"
    And I type my "phone number" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I type my "email" with status "UNCONFIRMED"
    And I click the "Create Account" button
    Then I verify the body starts with "+44"
