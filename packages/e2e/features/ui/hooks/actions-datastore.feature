Feature: Datastore action hooks

  The Datastore action hooks work correctly

  Background:
    Given I'm running the example "ui/hooks/actions"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"

  @react
  Scenario: DataStore Create, Update, Delete actions work correctly
    # Create
    When I type a new "Name" with value "milk2"
    Then I type a new "Count" with value "5"
    Then I type a new "Price" with value "3.99"
    Then I click the "Completed" checkbox
    Then I click the "Save" button
    Then I see the "milk2 - 5 @ 3.99 true" button

    # Update
    When I click the "milk2 - 5 @ 3.99 true" button
    Then I click the "clear" button
    Then I type a new "Update Name" with value "eggs"
    Then I type a new "Update Count" with value "4"
    Then I type a new "Update Price" with value "1.99"
    Then I click the "Update Completed" checkbox
    Then I click the "Update" button
    Then I see the "eggs - 4 @ 1.99 false" button

    # Delete
    When I click the "Delete" button
    Then I don't see "eggs - 4 @ 1.99 false"
