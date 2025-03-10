Feature: Override Authenticator Components

    Background:
        Given I'm running the example "OverrideComponents"

    @react-native
    Scenario: Sign In Renders
        Then I see 'Sign In'
        Then I see 'Sign in with Google'

    @react-native
    Scenario: Sign Up Renders
        When I click the 'Sign Up' button
        Then I see 'Sign Up'

    @react-native
    Scenario: Forgot Password Renders
        When I click the 'Forgot Password?' button
        Then I see 'Forgot Password'