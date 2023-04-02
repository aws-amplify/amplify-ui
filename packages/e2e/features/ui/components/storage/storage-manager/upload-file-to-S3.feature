
Feature: Upload a file to S3

Testing upload feature

  Background:
    Given I'm running the example "ui/components/storage/storage-manager"

  @react
  Scenario: I select a file and  upload it
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Browse files"
    And I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploads="  }' with fixture "FileUploader-uploads.xml"
    Given I intercept '{ "method": "PUT", "url": "**/test.jpg?partNumber**"  }' with fixture "FileUploader-uploads.xml"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploadId**"  }' with fixture "FileUploader-uploads-complete.xml"
    Given I intercept '{ "method": "GET", "url": "**/?list-type=2**"  }' with fixture "FileUploader-uploads-list.xml"
    Then I see "Uploaded successfully"
    Then I see "1 file uploaded"
    And I click the "Remove file" button
    Then I don't see "Uploaded successfully"
    Then I don't see "1 file uploaded"
