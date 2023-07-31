Feature: Upload a file to S3 with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-manager/public-access-level"

  @react
  Scenario: I select a file and upload it
    Then I see "Browse files"
    And I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploads"  }' with fixture "Storage.public-uploads.xml"
    Given I intercept '{ "method": "PUT", "url": "**/test.jpg?partNumber=1**"  }' with fixture "Storage.public-upload-part.xml" and add header "Etag" with value "&quot;abc123&quot;"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploadId**"  }' with fixture "Storage.public-upload-complete-multipart.xml"
    Given I intercept '{ "method": "GET", "url": "**/?list-type=2**"  }' with fixture "Storage.public-uploads-list.xml"
    Then I see "Uploaded"
    Then I see "1 file uploaded"

