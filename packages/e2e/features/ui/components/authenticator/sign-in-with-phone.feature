Feature: Sign In with Phone Number

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their phone
  number when signing into your application.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"

  @angular @react @vue @gen1 @gen2
  Scenario: Reset Password with valid phone with country code
    When I click the "Forgot your password?" button
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I verify the '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' body has "+19995554444" included
    Then I will be redirected to the confirm forgot password page
    Then I see "Code"
    Then I type a valid code
    Then I type my new password
    Then I confirm my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' with fixture "confirm-reset-password"
    Then I click the submit button
    Then I verify the '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' body has "+19995554444" included
    Then I see "Sign In"

  @angular @react @vue @gen1 @gen2
  Scenario: Sign in and replace default dial code
    Then I see "Sign In"
    Then the 'Country code' select drop down is '+82'

  @angular @react @vue @gen1 @gen2
  Scenario: Sign up and replace default dial code
    When I click the "Create Account" tab
    Then the 'Country code' select drop down is '+227'

  @angular @react @vue @gen1 @gen2
  Scenario: Sign up and replace dial code list
    When I click the "Create Account" tab
    Then the 'Country code' select drop down should have a length of '4'
    Then the 'Country code' select drop down is '+227'

  @angular @react @vue @react-native @gen1
  Scenario: Sign in with unknown credentials
    When I select my country code with status "UNKNOWN"
    Then I type my "phone number" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist."

  @angular @react @vue @react-native @gen2
  Scenario: Sign in with unknown credentials
    When I select my country code with status "UNKNOWN"
    Then I type my "phone number" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Incorrect username or password."

  @angular @react @vue @react-native @gen1 @gen2
  Scenario: Sign in with unconfirmed credentials
    When I select my country code with status "UNCONFIRMED"
    Then I type my "phone number" with status "UNCONFIRMED"
    Then I type my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with error fixture "user-not-confirmed-exception"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ResendConfirmationCode" } }' with fixture "resend-confirmation-code-email"
    Then I click the "Sign in" button
    Then I see "Confirmation Code"

  @angular @react @vue @react-native @gen1 @gen2
  Scenario: Sign in with confirmed credentials
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button

  @angular @react @vue @gen1
  Scenario: Sign in with confirmed credentials and don't select country code
    When I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist."

  @angular @react @vue @gen2
  Scenario: Sign in with confirmed credentials and don't select country code
    When I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Incorrect username or password."

  @angular @react @vue @react-native @gen1 @gen2
  Scenario: Sign in with confirmed credentials then sign out
    When I select my country code with status "CONFIRMED"
    Then I type my "phone number" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then I click the "Sign out" button
    Then I see "Sign in"

  @angular @react @vue @gen1 @gen2
  Scenario: Phone number field autocompletes username
  
  On sign in form, autocomplete prefers usage of username instead of phone number. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/.

    Then "Phone Number" field autocompletes "username"

  @angular @react @vue @gen1 @gen2
  Scenario: Password fields autocomplete "current-password"
    Then "Password" field autocompletes "current-password"

