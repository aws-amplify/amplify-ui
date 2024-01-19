Feature: A11y

  Test Storage Manager a11y

  Background:
    Given I'm running the example "ui/components/storage/storage-manager/default-files"
    Given I am testing a11y

  @angular @react @vue @a11y
  Scenario: The storage manager loads
    Then I check the page for a11y issues
