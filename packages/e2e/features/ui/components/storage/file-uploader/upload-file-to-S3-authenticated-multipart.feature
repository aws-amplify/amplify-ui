
Feature: Upload a file to S3 with authenticated access and multipart settings

  Background:
    Given I'm running the example "ui/components/storage/file-uploader/authenticated-multipart"

  @react
  Scenario: I authenticate, then select a file and upload it
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Browse files"
    Then I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploads"  }' with fixture "Storage.private-uploads.xml"
    Given I intercept '{ "method": "PUT", "url": "**/test.jpg?partNumber=1**"  }' with fixture "Storage.private-upload-part.xml" and add header "Etag" with value "&quot;abc123&quot;"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploadId**"  }' with fixture "Storage.private-upload-complete-multipart.xml"
    Given I intercept '{ "method": "GET", "url": "**/?list-type=2**"  }' with fixture "Storage.private-uploads-list.xml"
    Then I see "Uploaded"
    Then I see "1 file uploaded"
    Then I click "Sign out"
