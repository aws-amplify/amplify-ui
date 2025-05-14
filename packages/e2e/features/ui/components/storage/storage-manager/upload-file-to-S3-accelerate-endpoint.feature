Feature: Storage Manager with accelerate endpoint

  Background:
    Given I'm running the example "ui/components/storage/storage-manager/use-accelerate-endpoint"

  @react
  Scenario: I select a file and upload it on click
    Then I see "Browse files"
    Then I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Then I see "Upload 1 file"
    Then I see "Clear all"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploads"  }' with fixture "Storage.public-uploads.xml"
    Given I intercept '{ "method": "PUT", "url": "**/test.jpg?partNumber=1**"  }' with fixture "Storage.public-upload-part.xml" and add header "Etag" with value "&quot;abc123&quot;"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploadId**"  }' with fixture "Storage.public-upload-complete-multipart.xml"
    Given I intercept '{ "method": "GET", "url": "**/?list-type=2**"  }' with fixture "Storage.public-uploads-list.xml"
    Then I see "1 file selected"
    Then I click the "Upload 1 file" button
    Then I see "Uploaded"
    Then I see "1 file uploaded"

  @react
  Scenario: I can clear all selected files
    Then I see "Browse files"
    Then I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Then I see "Upload 1 file"
    Then I see "Clear all"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploads"  }' with fixture "Storage.public-uploads.xml"
    Given I intercept '{ "method": "PUT", "url": "**/test.jpg?partNumber=1**"  }' with fixture "Storage.public-upload-part.xml" and add header "Etag" with value "&quot;abc123&quot;"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploadId**"  }' with fixture "Storage.public-upload-complete-multipart.xml"
    Given I intercept '{ "method": "GET", "url": "**/?list-type=2**"  }' with fixture "Storage.public-uploads-list.xml"
    Then I click the "Clear all" button
    Then I see "Browse files"
    Then I don't see "Uploaded"
