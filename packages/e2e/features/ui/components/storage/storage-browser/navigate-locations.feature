Feature: Storage Browser navigate breadcrumbs

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Navigate back to Home
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the button containing "public"
    Then I see the "Home" button
    When I click the "Home" button
    Then I see "HOME"
    Then I see the button containing "public"

  @react
  Scenario: Navigate back up to prefix
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the button containing "public"
    Then I see the "Blueberry/" button
    When I click the "Blueberry/" button
    Then I see "Blackberry/"
    When I click the "Blackberry/" button
    Then I see "public/Blueberry/"
    When I click the "public/Blueberry" button
    Then I see "public/Blueberry/"

  @react
  Scenario: Navigate to parent folder from nested child folder
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the button containing "public"
    Then I see the "Blueberry/" button
    When I click the "Blueberry/" button
    Then I see the "Acai/" button
    When I click the "Acai/" button
    Then I see the "public/Blueberry" button
    When I click the "public/Blueberry" button
    Then I see "Blueberry/"
