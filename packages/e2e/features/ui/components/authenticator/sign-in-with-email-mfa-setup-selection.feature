Feature: Sign In with Email MFA Setup Selection

    Background:
        Given I'm running the example "ui/components/authenticator/sign-in-with-email-mfa-setup-selection"

    @react
    Scenario: Sign Up and Auto Sign In With Email MFA Setup Selection
        When I type a new "username"
        Then I type my password
        Then I confirm my password
        Then I click the "Create Account" button
        Then I see "Select MFA Type"
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign in"

    @react
    Scenario: Sign Up, Auto Sign In, Observe MFA Setup Selection Screen, Navigate Back To Sign In Page, and Sign In
        When I type a new "username"
        Then I type my password
        Then I confirm my password
        Then I click the "Create Account" button
        Then I see "Select MFA Type"
        Then I click the "Back to Sign in" button
        Then I see "Sign in"
        Then I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Select MFA Type"
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign in"

    @react
    Scenario: Sign Up, Auto Sign In, Select Email MFA Type For Setup, Observe Setup Email Screen, Navigate Back To Sign In Page, and Sign In
        When I type a new "username"
        Then I type my password
        Then I confirm my password
        Then I click the "Create Account" button
        Then I see "Select MFA Type"
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I click the "Back to Sign in" button
        Then I see "Sign in"
        Then I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Select MFA Type"
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign in"

    @react
    Scenario: Sign Up, Auto Sign In, Select Email MFA Type For Setup, Setup Email, Observe Confirmation Code Screen, Navigate Back To Sign In Page, and Sign In
        When I type a new "username"
        Then I type my password
        Then I confirm my password
        Then I click the "Create Account" button
        Then I see "Select MFA Type"
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "CONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I click the "Back to Sign in" button
        Then I see "Sign in"
        Then I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Select MFA Type"
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Setup Email"
        Then I type my "email" with status "UNCONFIRMED"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign in"