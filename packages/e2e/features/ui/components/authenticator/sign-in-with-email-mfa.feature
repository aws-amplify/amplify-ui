Feature: Sign In with Email MFA

    Background:
        Given I'm running the example "ui/components/authenticator/sign-in-with-email-mfa"

    @react
    Scenario: Sign In With Email MFA Selection
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Confirm Email Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"

    @react
    Scenario: Sign In, Observe Confirmation Code Screen, and Navigate Back To Sign In Page
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Confirm Email Code"
        Then I click the "Back to Sign In" button
        Then I see "Sign In"

    @react
    Scenario: Sign In, Enter Invalid Confirmation Code, Observe Error, Enter Valid Confirmation Code
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Confirm Email Code"
        Then I type an invalid confirmation code
        Then I click the "Confirm" button
        Then I see "Invalid code or auth state for the user."
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign In"
