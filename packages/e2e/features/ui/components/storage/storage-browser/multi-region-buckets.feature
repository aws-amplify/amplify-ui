Feature: Storage Browser Multi-Region Bucket Support

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/multi-region"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Navigate to bucket in different region
    Then I see "This StorageBrowser uses Multi-Region buckets"
    When I click the "another-multi-region-folder-do-not-delete/" button
    When I click the button with label "multi-region-file-do-not-delete.jpg file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see the "Image preview for multi-region-file-do-not-delete.jpg" image

   @react
  Scenario: Navigate to bucket in a third different region
    Then I see "This StorageBrowser uses Multi-Region buckets"
    When I click the "multi-region-folder-do-not-delete/" button  
    When I click the button with label "multi-region-file-do-not-delete.jpg file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see the "Image preview for multi-region-file-do-not-delete.jpg" image