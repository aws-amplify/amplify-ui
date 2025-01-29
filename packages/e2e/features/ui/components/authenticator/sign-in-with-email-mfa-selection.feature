Feature: Sign In with Email MFA Selection

    Background:
        Given I'm running the example "ui/components/authenticator/sign-in-with-email-mfa-selection"

    @react
    Scenario: Sign In With Email MFA Selection
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign in"

    @react
    Scenario: Sign In, Observe MFA Selection Screen, and Navigate Back To Sign In Page
        When I type my "username" with status "CONFIRMED'"
        Then I type my password
        Then I click the "Sign in" button
        Then I see "Select MFA Type"
        Then I click the "Back to Sign in" button
        Then I see "Sign in"

    @react
    Scenario: Sign In, Select Email MFA Type, Observe Confirmation Code Screen, and Navigate Back To Sign In Page
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I click the "Back to Sign in" button
        Then I see "Sign in"

    @react
    Scenario: Sign In, Select Email MFA Type, Enter Invalid Confirmation Code, Observe Error, Enter Valid Confirmation Code
        When I type my "username" with status "CONFIRMED"
        Then I type my password
        Then I click the "Sign in" button
        Then I select the MFA type "EMAIL"
        Then I click the "Confirm" button
        Then I see "Confirm MFA Code"
        Then I type an invalid confirmation code
        Then I click the "Confirm" button
        Then I see "Invalid code or auth state for the user"
        Then I type a valid confirmation code
        Then I click the "Confirm" button
        Then I click the "Sign out" button
        Then I see "Sign in"
