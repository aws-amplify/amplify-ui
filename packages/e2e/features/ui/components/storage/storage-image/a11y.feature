Feature: A11y

  Test Storage image a11y

  Background:
    Given I'm running the example "ui/components/storage/storage-image/public-access-level"
    Given I am testing a11y

  @angular @react @vue @a11y
  Scenario: The storage image loads
    Then I check the page for a11y issues
