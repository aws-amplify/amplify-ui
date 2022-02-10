Feature: Datastore action hooks

  The Datastore action hooks work correctly

  Background:
    Given I'm running the example "ui/hooks/actions"
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  Scenario: DataStore Create, Update, Delete actions work correctly
    # Create
    When I type a new "ToDo" with value "milk2"
    And I click the "Save" button
    Then I see the "milk2" button

    # Update
    When I click the "milk2" button
    And I click the "clear" button
    And I type a new "Update todo" with value "eggs"
    And I click the "Update" button
    Then I see the "eggs" button

    # Delete
    When I click the "Delete" button
    Then I don't see "eggs"
