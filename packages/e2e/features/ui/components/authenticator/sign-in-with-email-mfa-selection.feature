Feature: Sign In with Email MFA Selection

    Background:
        Given I'm running the example "ui/components/authenticator/sign-in-with-email-mfa-selection"

    @react @vue @svelte @angular @react-native
    Scenario: Sign In With Email MFA Selection
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

    @react @vue @svelte @angular @react-native
    Scenario: Sign In, Observe MFA Selection Screen, and Navigate Back to Sign In Page
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication"
        Then I click the "Back to Sign In" button
        Then I see "Sign In"

    @react @vue @svelte @angular @react-native
    Scenario: Sign In, Select Email MFA Type, Observe Confirmation Code Screen, and Navigate Back to Sign In Page
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I click the "Back to Sign In" button
        Then I see "Sign In"

    @react @vue @svelte @angular @react-native
    Scenario: Sign In, Select Email MFA Type, Enter Invalid Confirmation Code, Observe Error, Enter Valid Confirmation Code
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type an invalid confirmation code
        Then I click the "Confirm" button
        Then I see "The verification code you entered is incorrect"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

    @react @vue @svelte @angular @react-native
    Scenario: Sign In, Use Default Mfa Selection, Enter Valid Confirmation Code
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

