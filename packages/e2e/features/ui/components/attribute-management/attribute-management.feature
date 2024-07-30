Feature: User Attribute Management

Background:
    Given I'm running the example "/ui/components/attribute-management"

@react
Scenario: Sign in and sign out
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Sign Out" button

@react
Scenario: Sign in and view attributes
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see User Attributes

@react
Scenario: Update user attributes
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the "Edit" button
    Then I see "Given Name" as an input field
    When I type my "Given Name" as "Testy"
    Then I click the "Submit Updates" button
    When I click the "Done Editing" button
    Then I see "Given Name" attribute as "Testy"
    
@react
Scenario: Delete user attribute
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the "Edit" button
    Then I see "Given Name" as an input field
    When I type my "Given Name" as "Testy"
    Then I click the "Submit Updates" button
    When I click the "Done Editing" button
    Then I see "Given Name" attribute as "Testy"
    When I click the "Edit" button
    Then I click the "Delete" button for "Given Name"
    When I click the "Done Editing" button
    Then the "Given Name" attribute should be removed

@react
Scenario: Update email address
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the "Edit" button
    When I type my "Email" as "TESTER2@example.com"
    When I click the "Update Email" button
    Then I see "Verification Code for T***@e***" as an input field
    When I click the "Done Editing" button
    Then I click the "Sign Out" button
