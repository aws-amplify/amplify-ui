Feature: Upload a file to multiple S3 buckets with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/file-uploader/multi-bucket"

  @react
  Scenario: I upload a file to each bucket
    Given I intercept requests to host including "s3"
    Then I see "Drop files into Bucket 1"
    Then I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Then I see "Uploaded"
    Then I confirm the "s3" request was made to host containing "storageendtoendbucket"
    Then I see "1 file uploaded"
    Then I click the "Bucket 2" radio button
    Then I see "Drop files into Bucket 2"
    Then I select a file with file name "test.jpg"
    Then I see "test.jpg"
    Then I see "Uploaded"
    Then I confirm the "s3" request was made to host containing "storageendtoendsecondary"
