Feature: A11y

  Test Map with Search a11y

  Background:
    Given I'm running the example "ui/components/geo/map-with-location-search"
    Given I am testing a11y

  @react @a11y
  Scenario: The demo loads
    Then I check the page for a11y issues
