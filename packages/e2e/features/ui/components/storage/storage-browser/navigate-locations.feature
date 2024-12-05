Feature: Storage Browser navigate breadcrumbs

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Navigate back to Home
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Home" button
    When I click the "Home" button
    Then I see "Home - Amplify Auth"
    Then I see the first button containing "public"

  @react
  Scenario: Navigate back up to prefix
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "DO_NOT_DELETE/" button
    When I click the "DO_NOT_DELETE/" button
    Then I see "DONT_DELETE_SUB/"
    When I click the "DONT_DELETE_SUB/" button
    Then I see "DO_NOT_DELETE"
    Then I see "DONT_DELETE_SUB"

  @react
  Scenario: Navigate to parent folder from nested child folder
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "DO_NOT_DELETE/" button
    When I click the "DO_NOT_DELETE/" button
    Then I see the "DONT_DELETE_SUB/" button
    When I click the "DONT_DELETE_SUB/" button
    Then I see "DO_NOT_DELETE"
    When I click the "DO_NOT_DELETE" button
    Then I see "DONT_DELETE_SUB/"
