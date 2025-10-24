Feature: Custom Slots

  Authenticator has several "slots" that you can customize to add messaging
  and functionality to meet your app's needs.

  Visit https://ui.docs.amplify.aws/react/components/authenticator/customization#headers--footers
  for more details.


  Background:
    Given I'm running the example "ui/components/authenticator/custom-slots"

  @angular @react @vue @svelte
  Scenario: Has custom Confirm Sign Up Footer and Header slot text
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I click the "Create Account" tab
    When I type a new "email"
    When I type a custom password from label "Password:"
    When I type a custom confirm password from label "Confirm Password:"
    Then I click the "Create Account" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  @angular @react @vue @svelte
  Scenario: Has Confirm Reset Password Verify User Footer and Header slot text
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "verify-user-email"
    When I click the "Reset Password" button
    Then I see "Enter Information:"
    Then I type my "email" with status "UNVERIFIED"
    Then I click the "Send Code" button
    Then I see "Code"
    Then I see "Enter Information:"
    Then I see "Footer Information"

  @angular @react @vue @svelte
  Scenario: Has Setup TOTP Verify User Footer and Header slot text
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  @angular @react @vue @svelte
  Scenario: Has confirm sign in Footer and Header slot text
    When I type my "email" with status "UNVERIFIED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  @angular @react @vue @svelte
  Scenario: Has reset password in Footer and Header slot text
    When I click the "Reset Password" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  @angular @react @vue @svelte
  Scenario: Has a custom Header slot logo
    Then I see the "Amplify logo" image

  @angular @react @vue @svelte
  Scenario: Has custom Footer slot text
    Then I see "© All Rights Reserved"

  @angular @react @vue @svelte
  Scenario: Has custom Sign In Header slot text
    Then I see "Sign in to your account"

  @angular @react @vue @svelte
  Scenario: Has custom Sign In Footer slot text
    Given I see "Reset Password"
    When I click "Reset Password"
    Then I see "Send code"

  @angular @react @vue @svelte
  Scenario: Has custom Sign Up Header slot text
    When I click the "Create Account" tab
    Then I see "Create a new account"

  @angular @react @vue @svelte
  Scenario: Has custom Sign Up Footer slot text
    When I click the "Create Account" tab
    Then I see "Back to Sign In"
    When I click "Back to Sign In"
    Then I see "Sign in to your account"


