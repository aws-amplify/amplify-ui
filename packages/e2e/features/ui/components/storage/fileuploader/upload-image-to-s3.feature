
Feature: Upload image to s3

Testing upload image feature

  Background:
    Given I'm running the example "ui/components/storage/file-uploader"

  @react
  Scenario: I select a file and  upload it
    When I select a file with file name "test.jpg"
    Then I see "test.jpg" 
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploads="  }' with fixture "FileUploader-uploads.xml"
    Given I intercept '{ "method": "PUT", "url": "**/test.jpg?partNumber**"  }' with fixture "FileUploader-uploads.xml"
    Given I intercept '{ "method": "POST", "url": "**/test.jpg?uploadId**"  }' with fixture "FileUploader-uploads-complete.xml"
    Given I intercept '{ "method": "GET", "url": "**/?list-type=2**"  }' with fixture "FileUploader-uploads-list.xml"
    Then I click the 'Upload 1 files' button
    Then I see "Uploaded successfully"

