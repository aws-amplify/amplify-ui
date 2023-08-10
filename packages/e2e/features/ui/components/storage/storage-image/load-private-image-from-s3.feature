Feature: Load an image from S3 with private access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-image/private-access-level"

  @react
  Scenario: I successfully load a private image
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Loader" element
    Then I see the "private cat" image
    Then I see "The private image is loaded."
    Then I see "Sign out"
    Then I click "Sign out"
    Then I see "Sign in"
