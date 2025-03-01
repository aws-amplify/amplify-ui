Feature: Sign In with Email MFA Setup Selection

    Background:
        Given I'm running the example "ui/components/authenticator/sign-in-with-email-mfa-setup-selection"

    @react @vue @angular @react-native
    Scenario: Sign In With Email MFA Setup Selection
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

    @react @vue @angular @react-native
    Scenario: Sign In, Observe MFA Setup Selection Screen, Navigate Back To Sign In Page, and Sign In
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Back to Sign In" button
        Then I see "Sign In"
        Then I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

    @react @vue @angular @react-native
    Scenario: Sign In, Select Email MFA Type For Setup, Observe Setup Email Screen, Navigate Back To Sign In Page, and Sign In
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I click the "Back to Sign In" button
        Then I see "Sign In"
        Then I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

    @react @vue @angular @react-native
    Scenario: Sign In, Select Email MFA Type For Setup, Setup Email, Observe Confirmation Code Screen, Navigate Back To Sign In Page, and Sign In
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "CONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I click the "Back to Sign In" button
        Then I see "Sign In"
        Then I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Multi-Factor Authentication Setup"
        Then I click the "Email" radio button
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"